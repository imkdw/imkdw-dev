export interface ApiClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  credentials?: RequestCredentials;
}

export interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, any>;
  timeout?: number;
}

export type RequestInterceptor = (config: RequestInit & { url: string }) => RequestInit & { url: string } | Promise<RequestInit & { url: string }>;

export type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}