import type { Metadata } from 'next';
import { BookOpen, Clock, FileText, Folder, Zap } from 'lucide-react';
import { Layout, TerminalSection, ArticleCard, SeriesCard } from '@imkdw-dev/ui';

const recentArticles = [
  {
    title: 'React 18의 Concurrent Features 완전 정복',
    excerpt: 'React 18에서 새롭게 도입된 Concurrent Features를 활용해 더 나은 사용자 경험을 만드는 방법을 알아봅시다.',
    publishedAt: '2024년 12월 8일',
    readTime: '10분',
    tags: ['React', 'Performance', 'Frontend'],
    series: 'React 마스터하기',
    slug: 'react-18-concurrent-features',
    isBookmarked: false,
  },
  {
    title: 'Node.js와 TypeScript로 견고한 REST API 구축하기',
    excerpt:
      'Express.js와 TypeScript를 활용해 확장 가능하고 유지보수가 쉬운 REST API를 구축하는 방법을 단계별로 설명합니다.',
    publishedAt: '2024년 12월 5일',
    readTime: '15분',
    tags: ['Node.js', 'TypeScript', 'Backend'],
    series: '백엔드 개발 기초',
    slug: 'nodejs-typescript-rest-api',
    isBookmarked: true,
  },
  {
    title: 'CSS Grid vs Flexbox: 언제 무엇을 써야 할까?',
    excerpt:
      'CSS Grid와 Flexbox의 차이점을 이해하고, 각각의 장단점과 적절한 사용 시나리오를 실제 예제와 함께 알아보겠습니다.',
    publishedAt: '2024년 12월 3일',
    readTime: '8분',
    tags: ['CSS', 'Layout', 'Frontend'],
    slug: 'css-grid-vs-flexbox',
    isBookmarked: false,
  },
  {
    title: 'JavaScript 비동기 프로그래밍: Promise부터 async/await까지',
    excerpt:
      'JavaScript의 비동기 처리를 깊이 있게 이해하고, Promise, async/await, 그리고 최신 패턴들을 마스터해보세요.',
    publishedAt: '2024년 12월 1일',
    readTime: '12분',
    tags: ['JavaScript', 'Async', 'Programming'],
    slug: 'javascript-async-programming',
    isBookmarked: false,
  },
];

const recentSeries = [
  {
    title: 'React 마스터하기',
    description: 'React의 기초부터 고급 패턴까지, 실무에서 바로 활용할 수 있는 React 개발 가이드',
    articleCount: 12,
    totalReadTime: '4시간 30분',
    lastUpdated: '2024년 12월 8일',
    tags: ['React', 'Frontend', 'JavaScript'],
    slug: 'react-mastery',
    status: 'active' as const,
  },
  {
    title: '백엔드 개발 기초',
    description: 'Node.js와 TypeScript를 활용한 현대적인 백엔드 개발 방법론과 베스트 프랙티스',
    articleCount: 8,
    totalReadTime: '3시간 15분',
    lastUpdated: '2024년 12월 5일',
    tags: ['Node.js', 'TypeScript', 'Backend'],
    slug: 'backend-fundamentals',
    status: 'active' as const,
  },
];

const blogStats = [
  { label: '총 게시글', value: '127', color: 'text-primary' },
  { label: '진행 시리즈', value: '15', color: 'text-accent' },
  { label: '총 조회수', value: '45.2k', color: 'text-green-500' },
  { label: '기술 태그', value: '32', color: 'text-accent' },
];

const terminalCommands = [
  { command: 'git clone https://github.com/imkdw/imkdw-dev.git' },
  { command: 'cd imkdw-dev && pnpm install' },
  { command: 'pnpm dev' },
  { command: 'echo "Welcome to my blog!"' },
];

export const metadata: Metadata = {
  title: 'imkdw 개발 블로그 - 웹 개발자를 위한 기술 블로그',
  description:
    '최신 웹 기술, 프로그래밍 튜토리얼, 그리고 실무에서 바로 활용할 수 있는 코드 예제들을 제공하는 개발자 블로그입니다.',
  keywords: ['웹개발', 'React', 'TypeScript', 'Node.js', 'JavaScript', '프론트엔드', '백엔드', '프로그래밍'],
  authors: [{ name: 'imkdw', url: 'https://github.com/imkdw' }],
  creator: 'imkdw',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: 'imkdw 개발 블로그',
    description: '최신 웹 기술과 프로그래밍 지식을 공유하는 개발자 블로그',
    siteName: 'imkdw Blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'imkdw 개발 블로그',
    description: '최신 웹 기술과 프로그래밍 지식을 공유하는 개발자 블로그',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
  },
};

export default function Home() {
  return (
    <Layout>
      <main>
        <TerminalSection
          commands={terminalCommands}
          title="Tech Blog"
          description="학습하고 경험한 내용들을 공유하는 기술블로그 입니다"
          stats={blogStats}
          tags={['Node.js', 'TypeScript', 'Nestjs', 'Prisma', 'Nextjs']}
        />

        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10">
          {/* 최근 시리즈 섹션 */}
          <section className="bg-background border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">최근 시리즈</h2>
                  <div className="text-xs text-muted-foreground font-mono">find ./series -type d | head -2</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {recentSeries.map((series, index) => (
                <div key={series.slug} className="bounce-in h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SeriesCard {...series} />
                </div>
              ))}
            </div>
          </section>

          {/* 최근 게시글 섹션 */}
          <section className="bg-background border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">최근 게시글</h2>
                  <div className="text-xs text-muted-foreground font-mono">ls -la *.md | head -4</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {recentArticles.map((article, index) => (
                <div
                  key={article.slug}
                  className="bounce-in h-full"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <ArticleCard {...article} />
                </div>
              ))}
            </div>
          </section>

          {/* Blog Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-mono">.md</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold font-mono text-primary">127</div>
                <div className="text-sm md:text-base font-medium text-foreground">총 게시글</div>
                <div className="text-xs text-muted-foreground">지식 공유의 여정</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Folder className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                </div>
                <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-mono">active</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold font-mono text-accent">15</div>
                <div className="text-sm md:text-base font-medium text-foreground">진행중인 시리즈</div>
                <div className="text-xs text-muted-foreground">체계적인 학습 경험</div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Zap className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
                </div>
                <div className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full font-mono">weekly</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold font-mono text-green-500">매주</div>
                <div className="text-sm md:text-base font-medium text-foreground">새로운 콘텐츠</div>
                <div className="text-xs text-muted-foreground">꾸준한 업데이트</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
