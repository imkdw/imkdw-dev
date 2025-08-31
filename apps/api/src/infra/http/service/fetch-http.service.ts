import { HttpService } from '@/infra/http/service/http.service';
import { HttpRequestConfig, HttpResponse, RequestParams } from '@/infra/http/types/http.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchHttpService implements HttpService {
  async get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>({ url, config, method: 'GET' });
  }

  async post<T, V>(url: string, data?: V, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>({ url, data, config, method: 'POST' });
  }

  private async request<T>(params: RequestParams): Promise<HttpResponse<T>> {
    const { url, data, config, method } = params;

    const requestOptions: RequestInit = {
      method,
      headers: config?.headers as Record<string, string>,
    };

    if (data !== undefined && method !== 'GET' && method !== 'HEAD') {
      requestOptions.body = JSON.stringify(data);
      requestOptions.headers = {
        'Content-Type': 'application/json',
        ...requestOptions.headers,
      };
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await this.parseResponse<T>(response, config?.responseType);
    const headers = this.extractHeaders(response.headers);

    return { data: responseData, headers };
  }

  private async parseResponse<T>(response: Response, responseType?: string): Promise<T> {
    switch (responseType) {
      case 'arraybuffer':
        return (await response.arrayBuffer()) as T;
      case 'blob':
        return (await response.blob()) as T;
      case 'text':
        return (await response.text()) as T;
      case 'json':
      default:
        return response.json() as Promise<T>;
    }
  }

  private extractHeaders(headers: Headers): Record<string, string> {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}
