import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  User, 
  Calendar,
  CheckCircle,
  Circle,
  Play,
  Star,
  Share2,
  Bookmark,
  Tag
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const SeriesDetail = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const articlesPerPage = 5;

  // Mock 시리즈 데이터
  const seriesData = {
    title: 'React 완전정복',
    description: 'React의 기초부터 고급 기능까지 단계별로 학습할 수 있는 완전한 가이드입니다. Hook, Context, 성능 최적화 등 실무에서 필요한 모든 내용을 다룹니다.',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    tags: ['React', 'JavaScript', 'Frontend'],
    totalArticles: 12,
    totalReadTime: '3시간 30분',
    articles: [
      {
        id: 1,
        title: 'React 기초: 컴포넌트와 JSX',
        description: 'React의 기본 개념인 컴포넌트와 JSX 문법에 대해 알아봅니다.',
        readTime: '15분',
        publishedAt: '2024-01-01',
        order: 1,
        slug: 'react-basics-components-jsx'
      },
      {
        id: 2,
        title: 'State와 Props 완전 이해하기',
        description: 'React에서 데이터를 다루는 핵심 개념인 State와 Props를 자세히 살펴봅니다.',
        readTime: '20분',
        publishedAt: '2024-01-02',
        order: 2,
        slug: 'state-and-props'
      },
      {
        id: 3,
        title: 'React Hook 마스터하기',
        description: 'useState, useEffect를 포함한 React Hook의 모든 것을 배웁니다.',
        readTime: '25분',
        publishedAt: '2024-01-03',
        order: 3,
        slug: 'react-hooks-master'
      },
      {
        id: 4,
        title: 'Context API와 전역 상태 관리',
        description: 'Context API를 활용한 전역 상태 관리 방법을 실습해봅니다.',
        readTime: '18분',
        publishedAt: '2024-01-04',
        order: 4,
        slug: 'context-api-global-state'
      },
      {
        id: 5,
        title: 'React Router로 SPA 구현하기',
        description: 'React Router를 사용해서 Single Page Application을 구현하는 방법을 학습합니다.',
        readTime: '22분',
        publishedAt: '2024-01-05',
        order: 5,
        slug: 'react-router-spa'
      },
      {
        id: 6,
        title: '성능 최적화: useMemo와 useCallback',
        description: 'React 애플리케이션의 성능을 최적화하는 방법을 배웁니다.',
        readTime: '20분',
        publishedAt: '2024-01-06',
        order: 6,
        slug: 'performance-optimization'
      },
      {
        id: 7,
        title: 'Custom Hook 만들어 로직 재사용하기',
        description: 'Custom Hook을 만들어서 컴포넌트 로직을 재사용하는 방법을 알아봅니다.',
        readTime: '17분',
        publishedAt: '2024-01-07',
        order: 7,
        slug: 'custom-hooks'
      },
      {
        id: 8,
        title: 'React와 TypeScript 함께 사용하기',
        description: 'TypeScript와 React를 함께 사용해서 타입 안전한 애플리케이션을 만드는 방법을 학습합니다.',
        readTime: '24분',
        publishedAt: '2024-01-08',
        order: 8,
        slug: 'react-typescript'
      },
      {
        id: 9,
        title: '상태 관리 라이브러리: Redux Toolkit',
        description: 'Redux Toolkit을 사용한 상태 관리 방법을 실습해봅니다.',
        readTime: '28분',
        publishedAt: '2024-01-09',
        order: 9,
        slug: 'redux-toolkit'
      },
      {
        id: 10,
        title: 'React Testing Library로 테스트하기',
        description: 'React Testing Library를 사용해서 컴포넌트 테스트를 작성하는 방법을 배웁니다.',
        readTime: '21분',
        publishedAt: '2024-01-10',
        order: 10,
        slug: 'react-testing'
      },
      {
        id: 11,
        title: 'React 18의 새로운 기능들',
        description: 'React 18에서 추가된 Concurrent Features와 Suspense에 대해 알아봅니다.',
        readTime: '19분',
        publishedAt: '2024-01-11',
        order: 11,
        slug: 'react-18-features'
      },
      {
        id: 12,
        title: 'React 프로젝트 배포와 최적화',
        description: 'React 애플리케이션을 배포하고 최적화하는 방법을 종합적으로 다룹니다.',
        readTime: '26분',
        publishedAt: '2024-01-12',
        order: 12,
        slug: 'react-deployment'
      },
    ]
  };

  const totalPages = Math.ceil(seriesData.articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = seriesData.articles.slice(startIndex, startIndex + articlesPerPage);


  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link to="/series">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              시리즈 목록으로
            </Button>
          </Link>
        </div>

        {/* 시리즈 헤더 */}
        <div className="space-y-6 mb-8">
          {/* 메인 시리즈 카드 */}
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 shadow-lg">
            <CardContent className="p-0">
              {/* 상단 액션 바 */}
              <div className="flex justify-between items-center p-4 md:p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-muted-foreground">시리즈</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current text-primary' : ''}`} />
                    <span className="hidden sm:inline ml-2">북마크</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline ml-2">공유</span>
                  </Button>
                </div>
              </div>

              {/* 시리즈 정보 */}
              <div className="p-6 md:p-8">
                <div className="text-center md:text-left mb-8">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
                    {seriesData.title}
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
                    {seriesData.description}
                  </p>
                </div>

                {/* 태그 */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                  {seriesData.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover-scale"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 통계 카드들 - 모바일: 2x2, 데스크톱: 1x4 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="group hover:shadow-md transition-all duration-300 hover-scale">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-6 w-6" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{seriesData.totalArticles}</p>
                <p className="text-sm text-muted-foreground font-medium">총 글 수</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-300 hover-scale">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="text-lg md:text-xl font-bold text-foreground mb-1">{seriesData.totalReadTime}</p>
                <p className="text-sm text-muted-foreground font-medium">총 읽기 시간</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-300 hover-scale">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <p className="text-sm md:text-base font-bold text-foreground mb-1">{seriesData.updatedAt}</p>
                <p className="text-sm text-muted-foreground font-medium">최근 업데이트</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-300 hover-scale">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6" />
                </div>
                <p className="text-sm md:text-base font-bold text-foreground mb-1">{seriesData.createdAt}</p>
                <p className="text-sm text-muted-foreground font-medium">시리즈 생성일</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 글 목록 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              시리즈 글 목록
            </CardTitle>
            <CardDescription>
              순서대로 읽어나가며 체계적으로 학습하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
            {currentArticles.map((article) => {
              return (
                <div
                  key={article.id}
                  className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 md:p-4 rounded-lg border transition-colors hover:bg-muted/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="text-sm md:text-base font-mono text-primary font-semibold">
                        #{article.order.toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-semibold text-lg md:text-xl line-clamp-2">
                        {article.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2 md:gap-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={`/articles/${article.slug}`} className="self-start sm:self-center">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Play className="h-4 w-4 mr-1" />
                      읽기
                    </Button>
                  </Link>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SeriesDetail;