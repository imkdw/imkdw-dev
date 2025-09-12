'use client';

import Link from 'next/link';
import { BookOpen, Terminal } from 'lucide-react';
import { Button, cn, SeriesCard } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';

interface Props {
  series: Array<{
    title: string;
    description: string;
    articleCount: number;
    totalReadTime: string;
    lastUpdated: string;
    tags: string[];
    slug: string;
    status: 'active' | 'completed' | 'coming-soon';
  }>;
}

export function RecentSeriesSection({ series }: Props) {
  return (
    <div className="bg-background border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">최근 시리즈</h2>
            <div className={cn('terminal-prompt text-xs text-muted-foreground', jetBrainsMono.className)}>
              find ./series -type d | head -2
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/series">
            <Terminal className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">모든 시리즈</span>
            <span className="sm:hidden">전체</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {series.map((item, index) => (
          <div key={item.slug} className="bounce-in h-full" style={{ animationDelay: `${index * 0.1}s` }}>
            <SeriesCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
