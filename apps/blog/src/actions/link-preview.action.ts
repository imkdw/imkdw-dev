'use server';

import { parseLinkMetadata } from '@/lib/link-metadata-parser';
import type { LinkPreviewResult } from '@/types/link-preview';

export async function getLinkPreviewAction(url: string): Promise<LinkPreviewResult> {
  if (!isValidUrl(url)) {
    return { success: false, error: '유효하지 않은 URL입니다' };
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      return { success: false, error: 'URL을 가져오는데 실패했습니다' };
    }

    const html = await response.text();
    const data = parseLinkMetadata(html, url);

    return { success: true, data };
  } catch {
    return { success: false, error: '메타데이터를 파싱하는데 실패했습니다' };
  }
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
