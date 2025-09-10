import { useState, useEffect } from 'react';
import { Search, Filter, FileText, Clock, Calendar, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Link, useSearchParams } from 'react-router-dom';

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // URL 쿼리 파라미터에서 검색어 가져오기
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      setSelectedTag('all'); // 검색 시 태그는 전체로 설정
    }
  }, [searchParams]);

  // Mock 게시글 데이터
  const mockArticles = [
    {
      id: 1,
      title: 'React Hook의 완전한 이해',
      excerpt: 'useState, useEffect부터 커스텀 Hook까지 React Hook의 모든 것을 깊이 있게 다룹니다.',
      publishedAt: '2024-03-15',
      readTime: '12분',
      tags: ['React', 'JavaScript', 'Hook'],
      slug: 'react-hooks-complete-guide',
      views: 1234,
      likes: 89,
      series: 'React 완전정복'
    },
    {
      id: 2,
      title: 'TypeScript 고급 타입 시스템',
      excerpt: 'Utility Types, Conditional Types, Template Literal Types 등 TypeScript의 고급 기능들을 실무 예제와 함께 알아봅니다.',
      publishedAt: '2024-03-12',
      readTime: '18분',
      tags: ['TypeScript', 'JavaScript'],
      slug: 'typescript-advanced-types',
      views: 892,
      likes: 67,
      series: 'TypeScript 마스터 클래스'
    },
    {
      id: 3,
      title: 'Node.js Express 미들웨어 심화',
      excerpt: 'Express 미들웨어의 동작 원리부터 커스텀 미들웨어 작성까지 상세히 알아봅니다.',
      publishedAt: '2024-03-10',
      readTime: '15분',
      tags: ['Node.js', 'Express', 'Backend'],
      slug: 'nodejs-express-middleware',
      views: 756,
      likes: 54,
      series: 'Node.js 백엔드 개발'
    },
    {
      id: 4,
      title: 'Next.js App Router 완전 분석',
      excerpt: 'Next.js 13에서 도입된 App Router의 모든 기능과 사용법을 실전 예제로 배워봅니다.',
      publishedAt: '2024-03-08',
      readTime: '20분',
      tags: ['Next.js', 'React', 'SSR'],
      slug: 'nextjs-app-router-guide',
      views: 1156,
      likes: 98,
      series: 'Next.js 풀스택 개발'
    },
    {
      id: 5,
      title: 'AWS Lambda 서버리스 아키텍처',
      excerpt: 'AWS Lambda를 활용한 서버리스 아키텍처 설계와 구현 방법을 단계별로 알아봅니다.',
      publishedAt: '2024-03-05',
      readTime: '22분',
      tags: ['AWS', 'Lambda', 'Serverless'],
      slug: 'aws-lambda-serverless',
      views: 634,
      likes: 43,
      series: 'AWS 클라우드 인프라'
    },
    {
      id: 6,
      title: 'Docker 컨테이너 최적화 전략',
      excerpt: 'Docker 이미지 크기 최적화부터 멀티 스테이지 빌드까지 실무에서 사용하는 최적화 기법들을 정리했습니다.',
      publishedAt: '2024-03-03',
      readTime: '16분',
      tags: ['Docker', 'DevOps', 'Container'],
      slug: 'docker-optimization-strategies',
      views: 823,
      likes: 71,
      series: 'Docker & Kubernetes'
    },
    {
      id: 7,
      title: 'Vue.js Composition API 실무 활용',
      excerpt: 'Vue.js 3의 Composition API를 실무 프로젝트에서 효과적으로 활용하는 방법을 알아봅니다.',
      publishedAt: '2024-03-01',
      readTime: '14분',
      tags: ['Vue.js', 'JavaScript', 'Frontend'],
      slug: 'vuejs-composition-api-practical',
      views: 567,
      likes: 39,
      series: 'Vue.js 실무 활용'
    },
    {
      id: 8,
      title: 'GraphQL Schema 설계 베스트 프랙티스',
      excerpt: 'GraphQL 스키마를 설계할 때 고려해야 할 사항들과 실무에서 검증된 베스트 프랙티스를 소개합니다.',
      publishedAt: '2024-02-28',
      readTime: '19분',
      tags: ['GraphQL', 'Schema', 'API'],
      slug: 'graphql-schema-best-practices',
      views: 445,
      likes: 32,
      series: 'GraphQL 완전 정복'
    },
    {
      id: 9,
      title: 'Python Django REST Framework 심화',
      excerpt: 'Django REST Framework의 고급 기능들과 API 최적화 방법을 실전 예제와 함께 다룹니다.',
      publishedAt: '2024-02-25',
      readTime: '21분',
      tags: ['Python', 'Django', 'REST API'],
      slug: 'django-rest-framework-advanced',
      views: 612,
      likes: 47,
      series: 'Python 웹 개발'
    },
    {
      id: 10,
      title: 'Kubernetes Pod 네트워킹 완전 분석',
      excerpt: 'Kubernetes에서 Pod 간 네트워킹이 어떻게 동작하는지 상세히 분석하고 문제 해결 방법을 알아봅니다.',
      publishedAt: '2024-02-22',
      readTime: '25분',
      tags: ['Kubernetes', 'Networking', 'DevOps'],
      slug: 'kubernetes-pod-networking',
      views: 389,
      likes: 28,
      series: 'Docker & Kubernetes'
    },
    {
      id: 11,
      title: 'React Testing Library 테스트 전략',
      excerpt: 'React Testing Library를 활용한 효과적인 컴포넌트 테스트 작성 방법과 전략을 소개합니다.',
      publishedAt: '2024-02-20',
      readTime: '17분',
      tags: ['React', 'Testing', 'Jest'],
      slug: 'react-testing-library-strategies',
      views: 734,
      likes: 56,
      series: 'React 완전정복'
    },
    {
      id: 12,
      title: 'TypeScript 제네릭 심화 활용',
      excerpt: 'TypeScript 제네릭의 고급 활용법과 실무에서 유용한 패턴들을 예제와 함께 알아봅니다.',
      publishedAt: '2024-02-18',
      readTime: '16분',
      tags: ['TypeScript', 'Generic', 'Programming'],
      slug: 'typescript-generics-advanced',
      views: 892,
      likes: 73,
      series: 'TypeScript 마스터 클래스'
    },
  ];

  const tags = ['all', 'React', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'Docker', 'Vue.js', 'GraphQL', 'Python', 'Kubernetes'];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // 정렬
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'oldest':
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      case 'latest':
      default:
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3 md:mb-4">
            <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            <h1 className="text-2xl md:text-3xl font-bold">게시글</h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            개발과 기술에 대한 다양한 주제의 글들을 만나보세요
          </p>
          
          {/* 통계 카드 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
            <div className="bg-card border rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">전체 글</p>
                  <p className="text-lg md:text-2xl font-bold">{mockArticles.length}</p>
                </div>
                <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
            </div>
            <div className="bg-card border rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">총 조회수</p>
                  <p className="text-lg md:text-2xl font-bold">{mockArticles.reduce((acc, article) => acc + article.views, 0).toLocaleString()}</p>
                </div>
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
            </div>
            <div className="bg-card border rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">태그 수</p>
                  <p className="text-lg md:text-2xl font-bold">{new Set(mockArticles.flatMap(article => article.tags)).size}</p>
                </div>
                <Tag className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
            </div>
            <div className="bg-card border rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">태그 수</p>
                  <p className="text-lg md:text-2xl font-bold">{new Set(mockArticles.flatMap(article => article.tags)).size}</p>
                </div>
                <Tag className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-card border rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="제목이나 내용으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 sm:gap-3">
                 <Select value={sortBy} onValueChange={setSortBy}>
                   <SelectTrigger className="w-28 sm:w-36 md:w-40">
                     <SelectValue placeholder="정렬" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="latest">최신순</SelectItem>
                     <SelectItem value="oldest">오래된순</SelectItem>
                     <SelectItem value="popular">조회순</SelectItem>
                   </SelectContent>
                 </Select>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* 태그 필터 */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="text-xs h-8 px-3"
                >
                  {tag === 'all' ? '전체' : tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-6">
          <div className="space-y-4">
            {currentArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex justify-between items-start gap-3 md:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        {article.series && (
                          <div className="flex items-center px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <span className="text-sm font-medium text-primary">시리즈: {article.series}</span>
                          </div>
                        )}
                      </div>
                      
                      <Link to={`/articles/${article.slug}`}>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>
                      
                      <p className="text-muted-foreground mb-3 md:mb-4 line-clamp-2 text-sm md:text-base">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="whitespace-nowrap">{article.publishedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="whitespace-nowrap">{article.readTime}</span>
                        </div>
                        <span className="whitespace-nowrap">조회 {article.views.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {article.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{article.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
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

          {/* 결과가 없을 때 */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Articles;