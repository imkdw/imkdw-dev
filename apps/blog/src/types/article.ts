export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  href: string;
}

export interface RelatedArticle {
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  slug: string;
}

export interface NavigationArticle {
  title: string;
  slug: string;
}
