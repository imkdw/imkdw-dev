import type { MetadataRoute } from 'next';
import { getSeoSeriesList, getSeoArticlesList } from '@imkdw-dev/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL;

  const seriesList = await getSeoSeriesList();
  const seriesEntries: MetadataRoute.Sitemap = seriesList.map(series => ({
    url: `${baseUrl}/series/${series.slug}`,
    lastModified: new Date(series.updatedAt),
  }));

  const articlesList = await getSeoArticlesList();
  const articlesEntries: MetadataRoute.Sitemap = articlesList.map(article => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  return [...seriesEntries, ...articlesEntries];
}
