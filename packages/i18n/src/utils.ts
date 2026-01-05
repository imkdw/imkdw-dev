import type { Locale } from './types';

export function getLocalizedPath(pathname: string, locale: Locale): string {
  const withoutLocale = pathname.replace(/^\/(ko|en)/, '');
  return `/${locale}${withoutLocale}`;
}

export function extractLocale(pathname: string): Locale {
  const match = pathname.match(/^\/(ko|en)/);
  return match ? (match[1] as Locale) : 'ko';
}
