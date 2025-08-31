export const COOKIE_MAX_AGE = {
  HOUR_1: 1 * 60 * 60 * 1000,
  DAY_30: 30 * 24 * 60 * 60 * 1000,
} as const;

export const COOKIE_SAME_SITE = {
  NONE: 'none',
  LAX: 'lax',
  STRICT: 'strict',
} as const;
