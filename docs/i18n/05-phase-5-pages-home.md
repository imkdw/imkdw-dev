# Phase 5: 홈페이지

## 개요

홈페이지 및 관련 섹션 컴포넌트에 i18n 적용

- **예상 소요**: 0.5일
- **선행 조건**: Phase 2 완료
- **커밋 단위**: 2개

---

## Task 5.1: 메시지 파일에 홈페이지 번역 추가

### 작업 내용

- `messages/ko.json`에 home 네임스페이스 추가
- `messages/en.json`에 동일 구조 추가

### 파일 수정

#### `apps/blog/messages/ko.json` (추가)

```json
{
  "home": {
    "terminal": {
      "title": "Tech Blog",
      "description": "학습하고 경험한 내용들을 공유하는 기술블로그 입니다"
    },
    "stats": {
      "totalArticles": "총 게시글",
      "activeSeries": "진행 시리즈",
      "totalViews": "총 조회수",
      "techTags": "기술 태그"
    },
    "recentArticles": {
      "title": "최근 게시글",
      "viewAll": "모든 글",
      "viewAllShort": "전체"
    },
    "recentSeries": {
      "title": "최근 시리즈",
      "viewAll": "모든 시리즈",
      "viewAllShort": "전체"
    }
  }
}
```

#### `apps/blog/messages/en.json` (추가)

```json
{
  "home": {
    "terminal": {
      "title": "Tech Blog",
      "description": "A tech blog sharing what I've learned and experienced"
    },
    "stats": {
      "totalArticles": "Total Articles",
      "activeSeries": "Active Series",
      "totalViews": "Total Views",
      "techTags": "Tech Tags"
    },
    "recentArticles": {
      "title": "Recent Articles",
      "viewAll": "View All",
      "viewAllShort": "All"
    },
    "recentSeries": {
      "title": "Recent Series",
      "viewAll": "View All Series",
      "viewAllShort": "All"
    }
  }
}
```

### 확인 사항

- [ ] `ko.json`에 home 네임스페이스 추가됨
- [ ] `en.json`에 동일 구조 추가됨
- [ ] JSON 문법 오류 없음

### 커밋

```
feat(blog): add home page translations

- Add home namespace with terminal, stats, recentArticles, recentSeries
```

---

## Task 5.2: 홈페이지 및 섹션 컴포넌트 i18n 적용

### 작업 내용

- `page.tsx` 홈페이지 i18n 적용
- `TerminalSection` props 방식으로 수정 (packages/ui)
- `StatsGrid` props 방식으로 수정 (packages/ui)
- `RecentArticles`, `RecentSeries` 섹션 i18n 적용

### 파일 수정

#### `packages/ui/src/components/terminal/stats-grid.tsx`

```tsx
import { formatNumber } from '@imkdw-dev/utils/client';
import type { IResponseGetStatsDto } from '@imkdw-dev/types';

interface Props {
  stats: IResponseGetStatsDto;
  translations: {
    totalArticles: string;
    activeSeries: string;
    totalViews: string;
    techTags: string;
  };
}

export function StatsGrid({ stats, translations }: Props) {
  const statsItems = [
    {
      label: translations.totalArticles,
      value: stats.article.count.toString(),
      color: 'text-primary',
    },
    {
      label: translations.activeSeries,
      value: stats.series.count.toString(),
      color: 'text-accent',
    },
    {
      label: translations.totalViews,
      value: formatNumber(stats.article.viewCount),
      color: 'text-green-500',
    },
    {
      label: translations.techTags,
      value: stats.tag.count.toString(),
      color: 'text-accent',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
      {statsItems.map(stat => (
        <div key={stat.label} className="p-2 md:p-3 lg:p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className={`text-base md:text-lg lg:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
          <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
```

#### `packages/ui/src/components/terminal/terminal-section.tsx`

```tsx
'use client';

import { useState, useEffect } from 'react';
import { TerminalHeader } from './terminal-header';
import { TerminalContent } from './terminal-content';
import { StatsGrid } from './stats-grid';
import type { IResponseGetStatsDto } from '@imkdw-dev/types';
import { cn } from '../../lib';
import { jetBrainsMono } from '@imkdw-dev/fonts';

interface Props {
  title: string;
  description: string;
  stats: IResponseGetStatsDto;
  tags: string[];
  className?: string;
  statsTranslations: {
    totalArticles: string;
    activeSeries: string;
    totalViews: string;
    techTags: string;
  };
}

export const terminalCommands = [
  { command: 'git clone https://github.com/imkdw/imkdw-dev.git' },
  { command: 'cd imkdw-dev && pnpm install' },
  { command: 'pnpm dev' },
  { command: 'echo "Welcome to my blog!"' },
];

export const TerminalSection = ({ title, description, stats, tags, className = '', statsTranslations }: Props) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    let commandIndex = 0;
    let charIndex = 0;

    const typeCommand = () => {
      if (commandIndex < terminalCommands.length) {
        const currentCmd = terminalCommands[commandIndex];
        if (!currentCmd) return;

        const command = currentCmd.command;
        if (charIndex < command.length) {
          setCurrentCommand(command.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeCommand, 50);
        } else {
          setTimeout(() => {
            commandIndex++;
            charIndex = 0;
            if (commandIndex < terminalCommands.length) {
              setCurrentCommand('');
              setTimeout(typeCommand, 500);
            }
          }, 2000);
        }
      } else {
        setTimeout(() => {
          commandIndex = 0;
          charIndex = 0;
          setCurrentCommand('');
          setTimeout(typeCommand, 1000);
        }, 3000);
      }
    };

    setTimeout(typeCommand, 1000);
  }, [isClient]);

  return (
    <section
      className={cn('py-4 md:py-6 lg:py-8 bg-muted/20 border-b border-border', className, jetBrainsMono.className)}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch">
          <div className="terminal-window h-full flex flex-col min-h-[300px] md:min-h-[350px]">
            <TerminalHeader />
            <TerminalContent
              commands={terminalCommands}
              currentCommand={currentCommand}
              showCursor={showCursor}
              isClient={isClient}
            />
          </div>

          <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-center">
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">
                <span className="text-blue-500">const</span> <span className="text-primary">@imkdw-dev/blog</span>{' '}
                <span className="text-muted-foreground">=</span>{' '}
                <span className="text-amber-500">&quot;{title}&quot;</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
            </div>
            <StatsGrid stats={stats} translations={statsTranslations} />
            <div className="flex flex-wrap gap-1 md:gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="tracking-wider inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

#### `apps/blog/src/components/sections/recent-articles-section.tsx`

```tsx
import Link from 'next/link';
import { Clock, Terminal } from 'lucide-react';
import { Button, ArticleCard, cn } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { IArticleListItemDto } from '@imkdw-dev/types';

interface Props {
  articles: IArticleListItemDto[];
  translations: {
    title: string;
    viewAll: string;
    viewAllShort: string;
  };
}

export function RecentArticles({ articles, translations }: Props) {
  return (
    <section className="bg-background border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">{translations.title}</h2>
            <div className={cn('terminal-prompt text-xs text-muted-foreground', jetBrainsMono.className)}>
              ls -la *.md | head -4
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/articles">
            <Terminal className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{translations.viewAll}</span>
            <span className="sm:hidden">{translations.viewAllShort}</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {articles.map((article, index) => (
          <div key={article.slug} className="bounce-in h-full" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### `apps/blog/src/components/sections/recent-series-section.tsx`

```tsx
import Link from 'next/link';
import { BookOpen, Terminal } from 'lucide-react';
import { Button, cn, SeriesCard } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { ISeriesListItemDto } from '@imkdw-dev/types';

interface Props {
  seriesList: ISeriesListItemDto[];
  translations: {
    title: string;
    viewAll: string;
    viewAllShort: string;
  };
}

export function RecentSeries({ seriesList, translations }: Props) {
  return (
    <section className="bg-background border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">{translations.title}</h2>
            <div className={cn('terminal-prompt text-xs text-muted-foreground', jetBrainsMono.className)}>
              find ./series -type d | head -2
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/series">
            <Terminal className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{translations.viewAll}</span>
            <span className="sm:hidden">{translations.viewAllShort}</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {seriesList.map(item => (
          <div key={item.slug} className="bounce-in h-full">
            <SeriesCard series={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### `apps/blog/src/app/[locale]/page.tsx`

```tsx
import type { Metadata } from 'next';
import { TerminalSection } from '@imkdw-dev/ui';
import { Layout } from '@/components/layout';
import { RecentSeries } from '../../components/sections/recent-series-section';
import { RecentArticles } from '../../components/sections/recent-articles-section';
import { getSeriesList, getArticles, getStats } from '@imkdw-dev/api-client';
import { RECENT_SERIES_CARD_COUNT } from '@/consts/series.const';
import { RECENT_ARTICLES_COUNT } from '@/consts/article.const';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
  };
}

export default async function Home() {
  const series = await getSeriesList({ limit: RECENT_SERIES_CARD_COUNT, page: 1 });
  const articles = await getArticles({ limit: RECENT_ARTICLES_COUNT, page: 1 });
  const statsData = await getStats();

  const t = await getTranslations('home');

  const statsTranslations = {
    totalArticles: t('stats.totalArticles'),
    activeSeries: t('stats.activeSeries'),
    totalViews: t('stats.totalViews'),
    techTags: t('stats.techTags'),
  };

  const recentArticlesTranslations = {
    title: t('recentArticles.title'),
    viewAll: t('recentArticles.viewAll'),
    viewAllShort: t('recentArticles.viewAllShort'),
  };

  const recentSeriesTranslations = {
    title: t('recentSeries.title'),
    viewAll: t('recentSeries.viewAll'),
    viewAllShort: t('recentSeries.viewAllShort'),
  };

  return (
    <Layout>
      <div>
        <TerminalSection
          title={t('terminal.title')}
          description={t('terminal.description')}
          stats={statsData}
          tags={['Node.js', 'TypeScript', 'Nest.js', 'Prisma', 'Next.js']}
          statsTranslations={statsTranslations}
        />
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10">
          <RecentSeries seriesList={series.items} translations={recentSeriesTranslations} />
          <RecentArticles articles={articles.items} translations={recentArticlesTranslations} />
        </div>
      </div>
    </Layout>
  );
}
```

### 확인 사항

- [ ] StatsGrid에 translations props 추가됨
- [ ] TerminalSection에 statsTranslations props 추가됨
- [ ] RecentArticles에 translations props 추가됨
- [ ] RecentSeries에 translations props 추가됨
- [ ] page.tsx에서 번역 가져와서 전달
- [ ] `/ko`, `/en` 에서 각각 올바른 언어로 표시됨
- [ ] packages/ui 빌드 성공

### 커밋

```
feat(blog): apply i18n to home page and section components

- Update StatsGrid with translations prop
- Update TerminalSection with statsTranslations prop
- Update RecentArticles with translations prop
- Update RecentSeries with translations prop
- Update home page to pass translations
```

---

## Phase 5 완료 체크리스트

- [ ] Task 5.1 완료 및 커밋
- [ ] Task 5.2 완료 및 커밋
- [ ] `/ko` 홈페이지 한국어 표시 확인
- [ ] `/en` 홈페이지 영어 표시 확인
- [ ] 통계 라벨 번역 확인
- [ ] 최근 게시글/시리즈 섹션 번역 확인
- [ ] packages/ui 빌드 성공
- [ ] apps/blog 빌드 성공

## 다음 Phase

Phase 5 완료 후 [Phase 6: 게시글 페이지](./06-phase-6-pages-articles.md)로 진행
