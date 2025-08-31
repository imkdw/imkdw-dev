export interface HttpHeaders {
  [key: string]: string | string[] | undefined;
}

export interface HttpRequestConfig {
  headers?: HttpHeaders;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | 'stream';
}

export interface HttpResponse<T = unknown> {
  data: T;
  headers: HttpHeaders;
}

export interface RequestParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  data?: unknown;
  config?: HttpRequestConfig;
}
