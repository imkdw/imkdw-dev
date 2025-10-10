export function parseFromCookie<const K extends readonly string[]>(
  cookies: string,
  ...keys: K
): { [P in K[number]]: string } {
  const tokenCookies: { [key: string]: string } = {};

  cookies.split(';').forEach((cookie: string) => {
    const trimCookie = cookie.trim();
    const mid = trimCookie.indexOf('=');
    const [key, value] = [trimCookie.slice(0, mid), trimCookie.slice(mid + 1)];
    tokenCookies[key] = value;
  });

  return Object.fromEntries(keys.map(key => [key, tokenCookies[key] ?? ''])) as { [P in K[number]]: string };
}
