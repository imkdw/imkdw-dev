import type { MetadataRoute } from 'next';
import { getSeoSeriesList, getSeoArticlesList } from '@imkdw-dev/api-client';

const LOCALES = ['ko', 'en'] as const;
const DEFAULT_LOCALE = 'ko';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;

  const staticPages: MetadataRoute.Sitemap = LOCALES.flatMap(locale => [
    { url: `${baseUrl}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/${locale}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/${locale}/series`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]);

  const seriesList = await getSeoSeriesList();
  const seriesEntries: MetadataRoute.Sitemap = seriesList.map(series => ({
    url: `${baseUrl}/${DEFAULT_LOCALE}/series/${series.slug}`,
    lastModified: new Date(series.updatedAt),
    priority: 0.7,
  }));

  const articlesList = await getSeoArticlesList();
  const articlesEntries: MetadataRoute.Sitemap = articlesList.map(article => ({
    url: `${baseUrl}/${DEFAULT_LOCALE}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    priority: 0.8,
  }));

  return [...staticPages, ...seriesEntries, ...articlesEntries];
}
