import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/members/*', '/terminal', '/articles/create'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BLOG_URL}/sitemap.xml`,
  };
}
