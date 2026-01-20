import { ApiClientConfig, ApiError, ApiResponse, HttpMethod, RequestOptions } from '../types';
import { ErrorResponse } from '@imkdw-dev/types';
import { API_ENDPOINTS } from '@imkdw-dev/consts';

export abstract class BaseApiClient {
  protected readonly baseURL: string;
  protected readonly defaultHeaders: Record<string, string>;
  protected readonly timeout: number;
  protected readonly version: number;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout ?? 10000;
    this.version = config.version;
  }

  protected abstract getRequestInit(): Partial<RequestInit>;
  protected abstract getCookieHeaders(): Promise<Record<string, string>>;
  protected abstract performTokenRefresh(): Promise<boolean>;

  protected async request<T = unknown>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    options?: RequestOptions,
    isRetry = false
  ): Promise<T> {
    const versionedPath = `/v${this.version}/${path.replace(/^\/+/, '')}`;
    let url = `${this.baseURL}${versionedPath}`;

    if (options?.query) {
      const searchParams = new URLSearchParams();
      Object.entries(options.query).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });

      const queryString = searchParams.toString();

      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const cookieHeaders = await this.getCookieHeaders();
    const headers = { ...this.defaultHeaders, ...cookieHeaders, ...options?.headers };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options?.timeout ?? this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        ...this.getRequestInit(),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          const errorResponse: ErrorResponse = errorData.error ?? errorData;
          throw new ApiError(
            response.status,
            response.statusText,
            url,
            errorResponse.errorCode,
            errorResponse.message,
            { cause: errorResponse }
          );
        }

        throw new ApiError(response.status, response.statusText, url);
      }

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        const apiResponse: ApiResponse<T> = await response.json();
        return apiResponse.data;
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        if (error.status === 401 && !isRetry) {
          const refreshed = await this.handleTokenRefresh();

          if (refreshed) {
            return this.request<T>(method, path, body, options, true);
          }
        }

        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          const timeoutValue = options?.timeout ?? this.timeout;
          throw new ApiError(408, 'Request Timeout', url, undefined, `Request timed out after ${timeoutValue}ms`, {
            cause: error,
          });
        }

        throw new ApiError(500, 'Network Error', url, undefined, error.message, { cause: error });
      }

      throw new ApiError(500, 'Unknown Error', url, undefined, 'An unknown error occurred', { cause: error });
    }
  }

  async get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  async post<Req = unknown, Res = unknown>(path: string, data?: Req, options?: RequestOptions): Promise<Res> {
    return this.request<Res>('POST', path, data, options);
  }

  async put<Req = unknown, Res = unknown>(path: string, data?: Req, options?: RequestOptions): Promise<Res> {
    return this.request<Res>('PUT', path, data, options);
  }

  async patch<Req = unknown, Res = unknown>(path: string, data?: Req, options?: RequestOptions): Promise<Res> {
    return this.request<Res>('PATCH', path, data, options);
  }

  async delete<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  /**
   * 토큰 갱신 핸들러 - Race condition 방지를 위해 Promise 체이닝 사용
   * 동시에 여러 요청이 401을 받아도 토큰 갱신은 한 번만 수행됨
   */
  private async handleTokenRefresh(): Promise<boolean> {
    this.refreshPromise ??= this.performTokenRefresh().finally(() => {
      this.refreshPromise = null;
    });
    return this.refreshPromise;
  }

  protected getRefreshTokenUrl(): string {
    return `${this.baseURL}/v${this.version}/${API_ENDPOINTS.REFRESH_TOKEN}`;
  }
}
