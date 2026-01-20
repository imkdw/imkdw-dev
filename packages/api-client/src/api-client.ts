import { cookies } from 'next/headers';
import { BaseApiClient } from './core/base-client';

export class ApiClient extends BaseApiClient {
  protected getRequestInit(): Partial<RequestInit> {
    return {};
  }

  protected async getCookieHeaders(): Promise<Record<string, string>> {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    if (cookieString) {
      return { Cookie: cookieString };
    }

    return {};
  }

  protected async performTokenRefresh(): Promise<boolean> {
    try {
      const cookieStore = await cookies();
      const cookieString = cookieStore.toString();

      const response = await fetch(this.getRefreshTokenUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: cookieString },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
