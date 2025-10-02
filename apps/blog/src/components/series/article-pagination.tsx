import { CommonPagination } from '../common/common-pagination';

interface ArticlePaginationProps {
  totalPages: number;
  currentPage: number;
  slug: string;
}

export function ArticlePagination({ totalPages, currentPage, slug }: ArticlePaginationProps) {
  const createPageUrl = (page: number) => `/series/${slug}?page=${page}`;

  return <CommonPagination totalPages={totalPages} currentPage={currentPage} createPageUrl={createPageUrl} />;
}
