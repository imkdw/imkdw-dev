import { ApiClient } from './api-client';
import { ApiClientBrowser } from './api-client-browser';

function getBaseURL(): string {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error('API_URL is not set');
  }

  return API_URL;
}

const serverClients = new Map<number, ApiClient>();
const browserClients = new Map<number, ApiClientBrowser>();

export function getApiClient(version = 1): ApiClient | ApiClientBrowser {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    if (!serverClients.has(version)) {
      serverClients.set(
        version,
        new ApiClient({
          baseURL: getBaseURL(),
          timeout: 30000,
          version,
        })
      );
    }
    return serverClients.get(version)!;
  } else {
    if (!browserClients.has(version)) {
      browserClients.set(
        version,
        new ApiClientBrowser({
          baseURL: getBaseURL(),
          timeout: 30000,
          version,
        })
      );
    }
    return browserClients.get(version)!;
  }
}
