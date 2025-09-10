import { ArrowRight, Calendar, Pin, Flame, Terminal, BookOpen, Clock, FileText, Folder, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DevArticleCard from '@/components/article/DevArticleCard';
import SeriesCard from '@/components/series/SeriesCard';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();
  // 최근 게시글 목록 (4개만 표시)
  const recentArticles = [
    {
      title: "React 18의 Concurrent Features 완전 정복",
      excerpt: "React 18에서 새롭게 도입된 Concurrent Features를 활용해 더 나은 사용자 경험을 만드는 방법을 알아봅시다.",
      publishedAt: "2024년 12월 8일",
      readTime: "10분",
      tags: ["React", "Performance", "Frontend"],
      series: "React 마스터하기",
      slug: "react-18-concurrent-features",
      isBookmarked: false,
    },
    {
      title: "Node.js와 TypeScript로 견고한 REST API 구축하기",
      excerpt: "Express.js와 TypeScript를 활용해 확장 가능하고 유지보수가 쉬운 REST API를 구축하는 방법을 단계별로 설명합니다.",
      publishedAt: "2024년 12월 5일",
      readTime: "15분",
      tags: ["Node.js", "TypeScript", "Backend"],
      series: "백엔드 개발 기초",
      slug: "nodejs-typescript-rest-api",
      isBookmarked: true,
    },
    {
      title: "CSS Grid vs Flexbox: 언제 무엇을 써야 할까?",
      excerpt: "CSS Grid와 Flexbox의 차이점을 이해하고, 각각의 장단점과 적절한 사용 시나리오를 실제 예제와 함께 알아보겠습니다.",
      publishedAt: "2024년 12월 3일",
      readTime: "8분",
      tags: ["CSS", "Layout", "Frontend"],
      slug: "css-grid-vs-flexbox",
      isBookmarked: false,
    },
    {
      title: "JavaScript 비동기 프로그래밍: Promise부터 async/await까지",
      excerpt: "JavaScript의 비동기 처리를 깊이 있게 이해하고, Promise, async/await, 그리고 최신 패턴들을 마스터해보세요.",
      publishedAt: "2024년 12월 1일",
      readTime: "12분",
      tags: ["JavaScript", "Async", "Programming"],
      slug: "javascript-async-programming",
      isBookmarked: false,
    },
  ];

  // 최근 시리즈 목록 (2개만 표시)
  const recentSeries = [
    {
      title: "React 마스터하기",
      description: "React의 기초부터 고급 패턴까지, 실무에서 바로 활용할 수 있는 React 개발 가이드",
      articleCount: 12,
      totalReadTime: "4시간 30분",
      lastUpdated: "2024년 12월 8일",
      tags: ["React", "Frontend", "JavaScript"],
      slug: "react-mastery",
      status: 'active' as const,
    },
    {
      title: "백엔드 개발 기초",
      description: "Node.js와 TypeScript를 활용한 현대적인 백엔드 개발 방법론과 베스트 프랙티스",
      articleCount: 8,
      totalReadTime: "3시간 15분",
      lastUpdated: "2024년 12월 5일",
      tags: ["Node.js", "TypeScript", "Backend"],
      slug: "backend-fundamentals",
      status: 'active' as const,
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10 py-4 md:py-6">
      {/* 최근 시리즈 섹션 */}
      <div className="bg-background border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-foreground">최근 시리즈</h2>
              <div className="terminal-prompt text-xs text-muted-foreground font-mono">
                find ./series -type d | head -2
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="font-mono" onClick={() => navigate('/series')}>
            <Terminal className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">모든 시리즈</span>
            <span className="sm:hidden">전체</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {recentSeries.map((series, index) => (
            <div key={series.slug} className="bounce-in h-full" style={{ animationDelay: `${index * 0.1}s` }}>
              <SeriesCard {...series} />
            </div>
          ))}
        </div>
      </div>

      {/* 최근 게시글 섹션 */}
      <div className="bg-background border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-foreground">최근 게시글</h2>
              <div className="terminal-prompt text-xs text-muted-foreground font-mono">
                ls -la *.md | head -4
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="font-mono" onClick={() => navigate('/articles')}>
            <Terminal className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">모든 글</span>
            <span className="sm:hidden">전체</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {recentArticles.map((article, index) => (
            <div key={article.slug} className="bounce-in h-full" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
              <DevArticleCard {...article} />
            </div>
          ))}
        </div>
      </div>

      {/* Blog Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Total Articles */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-mono">
              .md
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold font-mono text-primary">127</div>
            <div className="text-sm md:text-base font-medium text-foreground">총 게시글</div>
            <div className="text-xs text-muted-foreground">지식 공유의 여정</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/5 rounded-full"></div>
        </div>

        {/* Active Series */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
              <Folder className="h-5 w-5 md:h-6 md:w-6 text-accent" />
            </div>
            <div className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-mono">
              active
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold font-mono text-accent">15</div>
            <div className="text-sm md:text-base font-medium text-foreground">진행중인 시리즈</div>
            <div className="text-xs text-muted-foreground">체계적인 학습 경험</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent/5 rounded-full"></div>
        </div>

        {/* Weekly Updates */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-terminal-warning/5 to-terminal-warning/10 border border-terminal-warning/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-terminal-warning/10 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-terminal-warning/10 rounded-lg group-hover:bg-terminal-warning/20 transition-colors">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-terminal-warning" />
            </div>
            <div className="text-xs px-2 py-1 bg-terminal-warning/10 text-terminal-warning rounded-full font-mono">
              cron
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold font-mono text-terminal-warning">매주</div>
            <div className="text-sm md:text-base font-medium text-foreground">새로운 콘텐츠</div>
            <div className="text-xs text-muted-foreground">꾸준한 업데이트</div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-terminal-warning/5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;