import { AUTH_ENDPOINTS } from './auth.const';
import { MEMBER_ENDPOINTS } from './member.const';
import { SERIES_ENDPOINTS } from './series.const';

export const API_ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...MEMBER_ENDPOINTS,
  ...SERIES_ENDPOINTS,
} as const;
