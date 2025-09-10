import { useState } from 'react';
import { Search, Filter, BookOpen, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SeriesCard from '@/components/series/SeriesCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Series = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const seriesPerPage = 8;

  // Mock 시리즈 데이터
  const mockSeries = [
    {
      title: 'React 완전정복',
      description: 'React의 기초부터 고급 기능까지 단계별로 학습할 수 있는 완전한 가이드입니다. Hook, Context, 성능 최적화 등 실무에서 필요한 모든 내용을 다룹니다.',
      articleCount: 12,
      totalReadTime: '3시간 30분',
      tags: ['React', 'JavaScript', 'Frontend'],
      slug: 'react-mastery',
      lastUpdated: '2024-01-15',
    },
    {
      title: 'TypeScript 마스터 클래스',
      description: 'TypeScript의 핵심 개념부터 고급 타입 시스템까지 완벽하게 마스터할 수 있습니다. 실제 프로젝트에 적용할 수 있는 실용적인 예제들로 구성되어 있습니다.',
      articleCount: 8,
      totalReadTime: '2시간 45분',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      slug: 'typescript-masterclass',
      lastUpdated: '2024-01-10',
    },
    {
      title: 'Node.js 백엔드 개발',
      description: 'Node.js를 활용한 백엔드 개발의 A부터 Z까지. Express, 데이터베이스 연동, API 설계, 보안까지 실무에서 필요한 모든 기술을 학습합니다.',
      articleCount: 15,
      totalReadTime: '4시간 20분',
      tags: ['Node.js', 'Backend', 'Express'],
      slug: 'nodejs-backend',
      lastUpdated: '2024-01-20',
    },
    {
      title: 'Next.js 풀스택 개발',
      description: 'Next.js 14의 최신 기능들을 활용한 풀스택 웹 애플리케이션 개발. App Router, Server Components, API Routes 등을 실습으로 배웁니다.',
      articleCount: 6,
      totalReadTime: '1시간 50분',
      tags: ['Next.js', 'React', 'Fullstack'],
      slug: 'nextjs-fullstack',
      lastUpdated: '2024-02-01',
    },
    {
      title: 'AWS 클라우드 인프라',
      description: 'AWS의 핵심 서비스들을 활용한 클라우드 인프라 구축과 운영. EC2, S3, RDS, Lambda 등의 서비스를 실제 프로젝트에 적용하는 방법을 학습합니다.',
      articleCount: 10,
      totalReadTime: '3시간 15분',
      tags: ['AWS', 'Cloud', 'DevOps'],
      slug: 'aws-infrastructure',
      lastUpdated: '2024-01-25',
    },
    {
      title: 'Docker & Kubernetes',
      description: '컨테이너화부터 오케스트레이션까지. Docker와 Kubernetes를 활용한 현대적인 애플리케이션 배포와 관리 전략을 실습을 통해 배웁니다.',
      articleCount: 9,
      totalReadTime: '2시간 55분',
      tags: ['Docker', 'Kubernetes', 'DevOps'],
      slug: 'docker-kubernetes',
      lastUpdated: '2024-01-18',
    },
    {
      title: 'Vue.js 실무 활용',
      description: 'Vue.js 3의 Composition API와 최신 기능들을 활용한 실무 중심의 웹 애플리케이션 개발을 학습합니다.',
      articleCount: 11,
      totalReadTime: '3시간 20분',
      tags: ['Vue.js', 'JavaScript', 'Frontend'],
      slug: 'vuejs-practical',
      lastUpdated: '2024-01-28',
    },
    {
      title: 'GraphQL 완전 정복',
      description: 'GraphQL의 기초부터 실무에서의 활용까지. Apollo Server, Client 구축 및 최적화 방법을 실습을 통해 배웁니다.',
      articleCount: 7,
      totalReadTime: '2시간 30분',
      tags: ['GraphQL', 'Apollo', 'API'],
      slug: 'graphql-complete',
      lastUpdated: '2024-02-03',
    },
    {
      title: 'Python 웹 개발',
      description: 'Django와 FastAPI를 활용한 Python 웹 개발의 모든 것. RESTful API 구축부터 배포까지 단계별로 학습합니다.',
      articleCount: 13,
      totalReadTime: '4시간 10분',
      tags: ['Python', 'Django', 'FastAPI'],
      slug: 'python-web-dev',
      lastUpdated: '2024-02-05',
    },
  ];

  const tags = ['all', 'React', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'Docker', 'DevOps'];

  const filteredSeries = mockSeries.filter(series => {
    const matchesSearch = series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         series.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || series.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredSeries.length / seriesPerPage);
  const startIndex = (currentPage - 1) * seriesPerPage;
  const currentSeries = filteredSeries.slice(startIndex, startIndex + seriesPerPage);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3 md:mb-4">
            <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            <h1 className="text-2xl md:text-3xl font-bold">시리즈</h1>
          </div>
          <p className="text-muted-foreground text-base md:text-lg">
            체계적으로 구성된 학습 시리즈로 깊이 있는 지식을 쌓아보세요
          </p>
          
          {/* 통계 카드 */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
            <div className="bg-card border rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">전체 시리즈</p>
                  <p className="text-lg md:text-2xl font-bold">{mockSeries.length}</p>
                </div>
                <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
            </div>
            <div className="bg-card border rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">총 글 수</p>
                  <p className="text-lg md:text-2xl font-bold">{mockSeries.reduce((acc, series) => acc + series.articleCount, 0)}</p>
                </div>
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
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
                  placeholder="시리즈 제목이나 내용으로 검색..."
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
                    <SelectItem value="popular">인기순</SelectItem>
                    <SelectItem value="articles">글 수</SelectItem>
                    <SelectItem value="name">이름순</SelectItem>
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

        {/* 시리즈 목록 */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {currentSeries.map((series) => (
              <SeriesCard key={series.slug} {...series} />
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
        </div>

          {/* 결과가 없을 때 */}
          {filteredSeries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요.</p>
            </div>
          )}
      </div>
    </Layout>
  );
};

export default Series;