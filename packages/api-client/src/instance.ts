import { ApiClient } from './api-client';

const getBaseURL = (): string => {
  const API_URL = process.env.API_URL;

  if (!API_URL) {
    throw new Error('API_URL is not set');
  }

  return API_URL;
};

export const apiClient = new ApiClient({
  baseURL: getBaseURL(),
  timeout: 30000,
  version: 1,
});
