import { BaseApiClient } from './core/base-client';


export class ApiClientBrowser extends BaseApiClient {
  protected getRequestInit(): Partial<RequestInit> {
    return { credentials: 'include' };
  }

  protected async getCookieHeaders(): Promise<Record<string, string>> {
    return {};
  }

  protected async performTokenRefresh(): Promise<boolean> {
    try {
      const response = await fetch(this.getRefreshTokenUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
