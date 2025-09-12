'use client';

import { useState } from 'react';
import { FileText, Search, Filter, Clock, Tag } from 'lucide-react';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  ArticleCard,
} from '@imkdw-dev/ui';

interface Props {
  initialArticles: Array<{
    title: string;
    excerpt: string;
    publishedAt: string;
    readTime: string;
    tags: string[];
    series: string;
    slug: string;
  }>;
}

export function ArticlesContent({ initialArticles }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const articlesPerPage = 12;

  const tags = [
    'all',
    'React',
    'TypeScript',
    'Node.js',
    'Next.js',
    'AWS',
    'Docker',
    'Vue.js',
    'GraphQL',
    'Python',
    'Kubernetes',
  ];

  const filteredArticles = initialArticles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      {/* 헤더 섹션 */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3 md:mb-4">
          <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold">게시글</h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
          <div className="bg-card rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-muted-foreground truncate">전체 게시글</p>
                <p className="text-lg md:text-2xl font-bold">{initialArticles.length}</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-muted-foreground truncate">평균 읽기 시간</p>
                <p className="text-lg md:text-2xl font-bold">15분</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-muted-foreground truncate">기술 태그</p>
                <p className="text-lg md:text-2xl font-bold">{tags.length - 1}</p>
              </div>
              <Tag className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-card rounded-lg p-4 md:p-6 mb-6 md:mb-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="게시글 제목이나 내용으로 검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
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
            {tags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'default' : 'outline'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {currentArticles.map(article => (
            <ArticleCard key={article.slug} {...article} />
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
                    onClick={e => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={e => {
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
                    onClick={e => {
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
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요</p>
        </div>
      )}
    </div>
  );
}
