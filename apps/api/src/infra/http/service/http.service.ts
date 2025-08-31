import { HttpRequestConfig, HttpResponse } from '@/infra/http/types/http.type';

export interface HttpService {
  get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  post<T, V>(url: string, data?: V, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}
