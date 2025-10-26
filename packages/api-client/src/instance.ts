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
const DEFAULT_TIMEOUT = 30000;
const DEFAULT_VERSION = 1;

export function getApiClient(version = DEFAULT_VERSION): ApiClient | ApiClientBrowser {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const existing = serverClients.get(version);
    if (existing) return existing;

    const client = new ApiClient({
      baseURL: getBaseURL(),
      timeout: DEFAULT_TIMEOUT,
      version,
    });
    serverClients.set(version, client);
    return client;
  } else {
    const existing = browserClients.get(version);
    if (existing) return existing;

    const client = new ApiClientBrowser({
      baseURL: getBaseURL(),
      timeout: DEFAULT_TIMEOUT,
      version,
    });
    browserClients.set(version, client);
    return client;
  }
}
