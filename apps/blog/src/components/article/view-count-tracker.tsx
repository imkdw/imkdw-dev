'use client';

import { useEffect } from 'react';
import { incrementViewCount } from '@imkdw-dev/api-client';
import { TWENTY_FOUR_HOURS_MS } from '@imkdw-dev/consts';

interface Props {
  slug: string;
}

function getCookieValue(slug: string): string | null {
  try {
    const cookieName = `article_viewed_${slug}`;
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === cookieName) {
        return value ?? null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

function setCookie(slug: string, timestamp: string): void {
  const cookieName = `article_viewed_${slug}`;
  const expirationDate = new Date(Date.now() + TWENTY_FOUR_HOURS_MS);
  document.cookie = `${cookieName}=${timestamp}; expires=${expirationDate.toUTCString()}; path=/`;
}

function shouldIncrementViewCount(slug: string): boolean {
  const lastViewedTimestamp = getCookieValue(slug);

  if (!lastViewedTimestamp) {
    return true;
  }

  const lastViewedTime = parseInt(lastViewedTimestamp, 10);
  if (isNaN(lastViewedTime)) {
    return true;
  }

  const timeSinceLastView = Date.now() - lastViewedTime;
  return timeSinceLastView >= TWENTY_FOUR_HOURS_MS;
}

export function ViewCountTracker({ slug }: Props) {
  useEffect(() => {
    const trackViewCount = async () => {
      try {
        if (shouldIncrementViewCount(slug)) {
          await incrementViewCount(slug);
          setCookie(slug, Date.now().toString());
        }
      } catch {
        //
      }
    };

    trackViewCount();
  }, [slug]);

  return null;
}
