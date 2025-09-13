'use client';

import Link from 'next/link';
import { Clock, Terminal } from 'lucide-react';
import { Button, ArticleCard, cn } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';

interface Props {
  articles: Array<{
    title: string;
    excerpt: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    series: string;
    slug: string;
    isBookmarked: boolean;
  }>;
}

export function RecentArticlesSection({ articles }: Props) {
  return (
    <section className="bg-background border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">최근 게시글</h2>
            <div className={cn('terminal-prompt text-xs text-muted-foreground', jetBrainsMono.className)}>
              ls -la *.md | head -4
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/articles">
            <Terminal className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">모든 글</span>
            <span className="sm:hidden">전체</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {articles.slice(0, 4).map((article, index) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.slug}
            className="bounce-in h-full"
            style={{ animationDelay: `${(index + 2) * 0.1}s` }}
          >
            <ArticleCard {...article} />
          </Link>
        ))}
      </div>
    </section>
  );
}
