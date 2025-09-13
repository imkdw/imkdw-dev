export interface Author {
  name: string;
  avatar?: string;
}

export interface SeriesInfo {
  title: string;
  part: number;
  total: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  tags: string[];
  series?: SeriesInfo;
}

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
