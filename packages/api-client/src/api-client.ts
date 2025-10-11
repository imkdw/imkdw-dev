import { cookies } from 'next/headers';
import { ApiClientConfig, ApiError, ApiResponse, HttpMethod, RequestOptions } from './types';
import { ErrorResponse } from '@imkdw-dev/types';
import { API_ENDPOINTS } from '@imkdw-dev/consts';

export class ApiClient {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly timeout: number;
  private readonly version: number;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout || 10000;
    this.version = config.version;
  }

  private async request<T = unknown>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const versionedPath = `/v${this.version}/${path.replace(/^\/+/, '')}`;
    let url = `${this.baseURL}${versionedPath}`;

    if (options?.query) {
      const searchParams = new URLSearchParams();
      Object.entries(options.query).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value));
        }
      });

      const queryString = searchParams.toString();

      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers = { ...this.defaultHeaders, ...options?.headers };

    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    if (cookieString) {
      headers['Cookie'] = cookieString;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options?.timeout || this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          const errorResponse: ErrorResponse = errorData.error;
          if (errorResponse) {
            throw new ApiError(
              response.status,
              response.statusText,
              url,
              errorResponse.errorCode,
              errorResponse.message
            );
          }
        }

        throw new ApiError(response.status, response.statusText, url);
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const apiResponse: ApiResponse<T> = await response.json();
        return apiResponse.data;
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        if (error.status === 401) {
          const refreshed = await this.handleTokenRefresh();

          if (refreshed) {
            return this.request<T>(method, path, body, options);
          }
        }

        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError(408, 'Request Timeout', url, undefined, 'Request timed out');
        }
        throw new ApiError(500, 'Network Error', url, undefined, error.message);
      }

      throw new ApiError(500, 'Unknown Error', url, undefined, 'An unknown error occurred');
    }
  }

  async get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  async post<Request = unknown, Response = unknown>(
    path: string,
    data?: Request,
    options?: RequestOptions
  ): Promise<Response> {
    return this.request<Response>('POST', path, data, options);
  }

  async put<Request = unknown, Response = unknown>(
    path: string,
    data?: Request,
    options?: RequestOptions
  ): Promise<Response> {
    return this.request<Response>('PUT', path, data, options);
  }

  async patch<Request = unknown, Response = unknown>(
    path: string,
    data?: Request,
    options?: RequestOptions
  ): Promise<Response> {
    return this.request<Response>('PATCH', path, data, options);
  }

  async delete<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  private async handleTokenRefresh(): Promise<boolean> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.refreshToken();

    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const url = `${this.baseURL}/v${this.version}/${API_ENDPOINTS.REFRESH_TOKEN}`;

      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookieString },
        credentials: 'include',
      });

      if (response.ok) {
        const setCookieHeader = response.headers.get('set-cookie');

        if (setCookieHeader) {
          this.applySetCookie(setCookieHeader, cookieStore);
        }

        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  private applySetCookie(setCookie: string, cookieStore: any): void {
    // "accessToken=value; Max-Age=3600; Path=/; HttpOnly; Secure; SameSite=Lax"
    const parts = setCookie.split(';').map(p => p.trim());
    const [nameValue, ...attrs] = parts;

    if (!nameValue) {
      return;
    }

    const [name, value] = nameValue.split('=');

    const options: Record<string, unknown> = {};

    attrs.forEach(attr => {
      const [key, val] = attr.includes('=') ? attr.split('=') : [attr, true];
      const k = key.toLowerCase();

      if (k === 'max-age' && typeof val === 'string') {
        options.maxAge = parseInt(val);
      } else if (k === 'path' && typeof val === 'string') {
        options.path = val;
      } else if (k === 'domain' && typeof val === 'string') {
        options.domain = val;
      } else if (k === 'secure') {
        options.secure = true;
      } else if (k === 'httponly') {
        options.httpOnly = true;
      } else if (k === 'samesite' && typeof val === 'string') {
        options.sameSite = val.toLowerCase();
      }
    });

    cookieStore.set(name, value, options);
  }
}
