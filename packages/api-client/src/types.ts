export interface ApiClientConfig {
  baseURL: string;
  version: number;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
    message?: string
  ) {
    super(message || `HTTP ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiResponse<T = unknown> {
  data: T;
}
