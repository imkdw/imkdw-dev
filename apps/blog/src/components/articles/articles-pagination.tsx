import { CommonPagination } from '../common/common-pagination';

interface Props {
  totalPages: number;
  currentPage: number;
}

export function ArticlesPagination({ totalPages, currentPage }: Props) {
  const createPageUrl = (page: number) => `/articles?page=${page}`;

  return <CommonPagination totalPages={totalPages} currentPage={currentPage} createPageUrl={createPageUrl} />;
}
