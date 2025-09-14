import type { ApiClientConfig, RequestOptions, RequestInterceptor, ResponseInterceptor } from './types';
import { RequestInterceptorManager, ResponseInterceptorManager } from './interceptors';
import { ApiError, NetworkError, TimeoutError } from './errors';

export class ApiClient {
  private config: Required<ApiClientConfig>;
  private requestInterceptors = new RequestInterceptorManager();
  private responseInterceptors = new ResponseInterceptorManager();

  constructor(config: ApiClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || '',
      headers: { 'Content-Type': 'application/json', ...config.headers },
      timeout: config.timeout || 10000,
      credentials: config.credentials || 'include',
    };
  }

  addRequestInterceptor(interceptor: RequestInterceptor): number {
    return this.requestInterceptors.use(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): number {
    return this.responseInterceptors.use(interceptor);
  }

  removeRequestInterceptor(id: number): void {
    this.requestInterceptors.eject(id);
  }

  removeResponseInterceptor(id: number): void {
    this.responseInterceptors.eject(id);
  }

  private buildURL(url: string, params?: Record<string, any>): string {
    const baseURL = this.config.baseURL;
    const fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;

    if (!params || Object.keys(params).length === 0) {
      return fullURL;
    }

    const urlObj = new URL(fullURL);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });

    return urlObj.toString();
  }

  private async executeRequest<T>(
    method: string,
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, timeout = this.config.timeout, ...requestOptions } = options;
    const fullURL = this.buildURL(url, params);

    let requestConfig: RequestInit & { url: string } = {
      method,
      headers: {
        ...this.config.headers,
        ...requestOptions.headers,
      },
      credentials: this.config.credentials,
      url: fullURL,
      ...requestOptions,
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      requestConfig.body = JSON.stringify(data);
    }

    try {
      requestConfig = await this.requestInterceptors.execute(requestConfig);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(requestConfig.url, {
        ...requestConfig,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const processedResponse = await this.responseInterceptors.execute(response);

      if (!processedResponse.ok) {
        let errorData;
        try {
          errorData = await processedResponse.json();
        } catch {
          errorData = await processedResponse.text();
        }

        throw new ApiError(
          processedResponse.status,
          processedResponse.statusText,
          errorData,
          fullURL
        );
      }

      const contentType = processedResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await processedResponse.json();
      }

      return (await processedResponse.text()) as unknown as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new TimeoutError(timeout);
      }

      throw new NetworkError(
        error instanceof Error ? error.message : 'Unknown network error',
        error instanceof Error ? error : undefined
      );
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>('GET', url, undefined, options);
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>('POST', url, data, options);
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>('PUT', url, data, options);
  }

  async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>('PATCH', url, data, options);
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.executeRequest<T>('DELETE', url, undefined, options);
  }
}