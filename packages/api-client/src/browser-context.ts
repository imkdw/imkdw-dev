import { cache } from 'react';
import { headers } from 'next/headers';
import { BrowserContext } from './types';

function extractClientIp(headerStore: Awaited<ReturnType<typeof headers>>): string | undefined {
  const forwardedFor = headerStore.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = headerStore.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return undefined;
}

export const getBrowserContext = cache(async (): Promise<BrowserContext> => {
  const headerStore = await headers();

  const ip = extractClientIp(headerStore);
  const userAgent = headerStore.get('user-agent') ?? undefined;

  return { ip, userAgent };
});
