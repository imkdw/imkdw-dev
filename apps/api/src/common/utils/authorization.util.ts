/**
 * 인증 헤더에서 토큰 추출
 * @example
 * ```ts
 * extractToken('Bearer 1234567890'); // '1234567890'
 * extractToken('Basic 1234567890'); // ''
 * ```
 */
export function extractBearerToken(authorization: string): string {
  if (!authorization) {
    return '';
  }

  const [tokenType, value] = authorization.split(' ');
  if (tokenType !== 'Bearer') {
    return '';
  }

  return value ?? '';
}

/**
 * 쿠키에서 토큰 추출
 */
export function parseJwtFromCookie(cookie: string) {
  const tokenCookies: { [key: string]: string } = {};

  cookie.split(';').forEach((_cookie: string) => {
    const trimCookie = _cookie.trim();
    const mid = trimCookie.indexOf('=');
    const [key, value] = [trimCookie.slice(0, mid), trimCookie.slice(mid + 1)];
    tokenCookies[key] = value;
  });

  const accessToken = tokenCookies['accessToken'] ?? '';
  const refreshToken = tokenCookies['refreshToken'] ?? '';

  return { accessToken, refreshToken };
}
