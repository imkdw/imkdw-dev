export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any,
    public url?: string
  ) {
    super(`API Error: ${status} ${statusText}${url ? ` (${url})` : ''}`);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(`Network Error: ${message}`);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(timeout: number) {
    super(`Request timeout after ${timeout}ms`);
    this.name = 'TimeoutError';
  }
}

export function isApiError(error: any): error is ApiError {
  return error instanceof ApiError;
}

export function isNetworkError(error: any): error is NetworkError {
  return error instanceof NetworkError;
}

export function isTimeoutError(error: any): error is TimeoutError {
  return error instanceof TimeoutError;
}