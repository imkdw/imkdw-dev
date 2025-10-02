import { CommonPagination } from '../common/common-pagination';

interface Props {
  totalPages: number;
  currentPage: number;
}

export function SeriesPagination({ totalPages, currentPage }: Props) {
  const createPageUrl = (page: number) => `/series?page=${page}`;

  return <CommonPagination totalPages={totalPages} currentPage={currentPage} createPageUrl={createPageUrl} />;
}
