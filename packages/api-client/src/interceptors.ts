import type { RequestInterceptor, ResponseInterceptor } from './types';

export class InterceptorManager<T> {
  protected interceptors: Array<T | null> = [];

  use(interceptor: T): number {
    this.interceptors.push(interceptor);
    return this.interceptors.length - 1;
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }

  clear(): void {
    this.interceptors = [];
  }

  forEach(fn: (interceptor: T) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    });
  }
}

export class RequestInterceptorManager extends InterceptorManager<RequestInterceptor> {
  async execute(config: RequestInit & { url: string }): Promise<RequestInit & { url: string }> {
    let result = config;

    for (const interceptor of this.interceptors) {
      if (interceptor) {
        result = await interceptor(result);
      }
    }

    return result;
  }
}

export class ResponseInterceptorManager extends InterceptorManager<ResponseInterceptor> {
  async execute(response: Response): Promise<Response> {
    let result = response;

    for (const interceptor of this.interceptors) {
      if (interceptor) {
        result = await interceptor(result);
      }
    }

    return result;
  }
}