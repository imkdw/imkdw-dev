'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@imkdw-dev/ui';
import { ArticlePagination } from './article-pagination';
import { BookOpen, Calendar, Clock, Play } from 'lucide-react';
import type { Article } from '../../types/series';

interface ArticleListWithPaginationProps {
  articles: Article[];
  articlesPerPage?: number;
}

export function ArticleListWithPagination({ articles, articlesPerPage = 5 }: ArticleListWithPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

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
        <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
          {currentArticles.map(article => (
            <div
              key={article.id}
              className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 md:p-4 rounded-lg transition-colors hover:bg-muted/50"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-sm md:text-base font-mono text-primary font-semibold">
                    #{article.order.toString().padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-lg md:text-xl line-clamp-2">{article.title}</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-2">{article.description}</p>
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

              <Link href={`/articles/${article.slug}`} className="self-start sm:self-center">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Play className="h-4 w-4 mr-1" />
                  읽기
                </Button>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
      <ArticlePagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </>
  );
}
