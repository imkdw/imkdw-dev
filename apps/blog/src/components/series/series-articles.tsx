import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@imkdw-dev/ui';
import { formatDate, formatReadTime } from '@imkdw-dev/utils/client';
import { BookOpen, Calendar, Clock, Play } from 'lucide-react';
import type { IArticleListItemDto } from '@imkdw-dev/types';
import { CommonPagination } from '@/components/common/common-pagination';

interface Props {
  articles: IArticleListItemDto[];
  totalPages: number;
  currentPage: number;
  slug: string;
  totalCount: number;
}

export function SeriesArticles({ articles, totalPages, currentPage, slug, totalCount }: Props) {
  const createPageUrl = (page: number) => `/series/${slug}?page=${page}`;

  return (
    <>
      <Card className="border-none bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            시리즈 글 목록
          </CardTitle>
          <CardDescription>순서대로 읽어나가며 체계적으로 학습하세요</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {articles.map((article, index) => (
            <div key={article.id} className="flex flex-col sm:flex-row sm:gap-2 p-2 sm:p-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  {/* 게시글 번호 */}
                  <span className="text-sm md:text-base font-mono text-primary font-semibold">
                    #{(totalCount - (currentPage - 1) * articles.length - index).toString().padStart(2, '0')}
                  </span>

                  {/* 게시글 제목 */}
                  <h3 className="font-semibold text-lg md:text-xl line-clamp-2">{article.title}</h3>
                </div>

                <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2 md:gap-4">
                  {/* 게시글 읽기 시간 */}
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatReadTime(article.readMinute)}</span>
                  </div>

                  {/* 게시글 생성 일시 */}
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* 게시글 읽기 버튼 */}
              <Link href={`/articles/${article.slug}`} className="self-start mt-4 sm:mt-0">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Play className="h-4 w-4 mr-1" />
                  읽기
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
      <CommonPagination totalPages={totalPages} currentPage={currentPage} createPageUrl={createPageUrl} />
    </>
  );
}
