import * as cheerio from 'cheerio';
import type { LinkPreviewData } from '@/types/link-preview';

export function parseLinkMetadata(html: string, baseUrl: string): LinkPreviewData {
  const $ = cheerio.load(html);
  const url = new URL(baseUrl);

  return {
    url: baseUrl,
    title: extractTitle($),
    description: extractDescription($),
    image: extractImage($, url),
    siteName: extractSiteName($),
    favicon: extractFavicon($, url),
  };
}

function extractTitle($: cheerio.CheerioAPI): string | null {
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const pageTitle = $('title').text();

  return ogTitle ?? twitterTitle ?? (pageTitle.length > 0 ? pageTitle : null);
}

function extractDescription($: cheerio.CheerioAPI): string | null {
  return (
    $('meta[property="og:description"]').attr('content') ??
    $('meta[name="twitter:description"]').attr('content') ??
    $('meta[name="description"]').attr('content') ??
    null
  );
}

function extractImage($: cheerio.CheerioAPI, baseUrl: URL): string | null {
  const image =
    $('meta[property="og:image"]').attr('content') ?? $('meta[name="twitter:image"]').attr('content') ?? null;

  if (image && !image.startsWith('http')) {
    return new URL(image, baseUrl.origin).href;
  }
  return image;
}

function extractSiteName($: cheerio.CheerioAPI): string | null {
  return $('meta[property="og:site_name"]').attr('content') ?? null;
}

function extractFavicon($: cheerio.CheerioAPI, baseUrl: URL): string | null {
  const favicon =
    $('link[rel="icon"]').attr('href') ??
    $('link[rel="shortcut icon"]').attr('href') ??
    $('link[rel="apple-touch-icon"]').attr('href') ??
    '/favicon.ico';

  if (!favicon.startsWith('http')) {
    return new URL(favicon, baseUrl.origin).href;
  }
  return favicon;
}
