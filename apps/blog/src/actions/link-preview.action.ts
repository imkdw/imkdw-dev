'use server';

import { parseLinkMetadata } from '@/lib/link-metadata-parser';
import type { LinkPreviewResult } from '@/types/link-preview';

export async function getLinkPreviewAction(url: string): Promise<LinkPreviewResult> {
  if (!isValidUrl(url)) {
    return { success: false, error: '유효하지 않은 URL입니다' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { success: false, error: 'URL을 가져오는데 실패했습니다' };
    }

    const html = await response.text();
    const data = parseLinkMetadata(html, url);

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: '요청 시간이 초과되었습니다' };
    }
    return { success: false, error: '메타데이터를 파싱하는데 실패했습니다' };
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
