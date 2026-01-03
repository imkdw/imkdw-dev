'use server';

import { parseLinkMetadata } from '@/lib/link-metadata-parser';
import { LinkPreviewData, LinkPreviewResult } from '@/types/link-preview';

const LINKPREVIEW_API_KEY = process.env.LINKPREVIEW_API_KEY;

export async function getLinkPreviewAction(url: string): Promise<LinkPreviewResult> {
  if (!isValidUrl(url)) {
    return { success: false, error: '유효하지 않은 URL입니다' };
  }

  try {
    const data = await fetchWithOwnParser(url);

    if (!data.description && LINKPREVIEW_API_KEY) {
      const fallbackData = await fetchWithLinkPreviewAPI(url);
      if (fallbackData) {
        return {
          success: true,
          data: {
            ...data,
            description: fallbackData.description ?? data.description,
            image: data.image ?? fallbackData.image,
          },
        };
      }
    }

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: '요청 시간이 초과되었습니다' };
    }
    return { success: false, error: '메타데이터를 파싱하는데 실패했습니다' };
  }
}

async function fetchWithOwnParser(url: string): Promise<LinkPreviewData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
    },
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error('Failed to fetch URL');
  }

  const html = await response.text();
  return parseLinkMetadata(html, url);
}

async function fetchWithLinkPreviewAPI(url: string): Promise<LinkPreviewData | null> {
  try {
    const response = await fetch(
      `https://api.linkpreview.net/?key=${LINKPREVIEW_API_KEY}&q=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      url: data.url ?? url,
      title: data.title ?? null,
      description: data.description ?? null,
      image: data.image ?? null,
      siteName: null,
      favicon: null,
    };
  } catch {
    return null;
  }
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();
    const blockedPatterns = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^169\.254\./,
    ];

    return !blockedPatterns.some(pattern =>
      typeof pattern === 'string' ? hostname === pattern : pattern.test(hostname)
    );
  } catch {
    return false;
  }
}
