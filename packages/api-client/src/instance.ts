'use server';

import { ApiClient } from './api-client';

function getBaseURL(): string {
  const API_URL = process.env.API_URL;

  if (!API_URL) {
    throw new Error('API_URL is not set');
  }

  return API_URL;
}

let _apiClient: ApiClient | null = null;

export function getApiClient() {
  _apiClient ??= new ApiClient({
    baseURL: getBaseURL(),
    timeout: 30000,
    version: 1,
  });

  return _apiClient;
}
