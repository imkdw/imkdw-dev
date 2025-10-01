'use client';

import { useState } from 'react';
import { BookOpen, Clock, Search, Filter } from 'lucide-react';
import type { ISeriesListItemDto } from '@imkdw-dev/types';
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
} from '@imkdw-dev/ui';

interface Props {
  initialSeries: ISeriesListItemDto[];
}

export function SeriesContent({ initialSeries }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const seriesPerPage = 6;

  const tags = ['all', 'React', 'TypeScript', 'Node.js', 'Next.js', 'AWS', 'Docker', 'DevOps'];

  const filteredSeries = initialSeries.filter(series => {
    const matchesSearch =
      series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'all' || series.tags.some(tag => tag.name === selectedTag);
    return matchesSearch && matchesTag;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredSeries.length / seriesPerPage);
  // const startIndex = (currentPage - 1) * seriesPerPage;
  // const currentSeries = filteredSeries.slice(startIndex, startIndex + seriesPerPage);

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      {/* 헤더 섹션 */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center mb-3 md:mb-4 gap-2">
          <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold m-0">시리즈</h1>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
          <div className="bg-card rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-muted-foreground truncate">전체 시리즈</p>
                <p className="text-lg md:text-2xl font-bold">{initialSeries.length}</p>
              </div>
              <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            </div>
          </div>
          <div className="bg-card rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-muted-foreground truncate">총 글 수</p>
                <p className="text-lg md:text-2xl font-bold">
                  {initialSeries.reduce((acc, series) => acc + series.articleCount, 0)}
                </p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
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
                placeholder="시리즈 제목이나 내용으로 검색..."
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

      {/* 시리즈 목록 */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {/* TODO: SeriesCard Props를 API 응답 타입에 맞게 수정 필요 */}
          {/* {currentSeries.map(series => (
            <SeriesCard key={series.slug} series={series} />
          ))} */}
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
      {filteredSeries.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요</p>
        </div>
      )}
    </div>
  );
}
