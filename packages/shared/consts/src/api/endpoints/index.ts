import { AUTH_ENDPOINTS } from './auth.const';
import { MEMBER_ENDPOINTS } from './member.const';

export const API_ENDPOINTS = {
  ...AUTH_ENDPOINTS,
  ...MEMBER_ENDPOINTS,
} as const;
