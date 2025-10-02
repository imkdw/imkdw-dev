import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@imkdw-dev/ui';

interface Props {
  totalPages: number;
  currentPage: number;
}

export function SeriesPagination({ totalPages, currentPage }: Props) {
  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => `/series?page=${page}`;

  // 최대 3개의 페이지 번호만 표시하도록 범위 계산
  const getPageRange = () => {
    const pages: number[] = [];

    if (totalPages <= 3) {
      // 전체 페이지가 3개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 3개 표시
      let start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, start + 2);

      // 마지막 페이지 근처일 때 조정
      if (end === totalPages) {
        start = Math.max(1, end - 2);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {getPageRange().map(page => (
            <PaginationItem key={page}>
              <PaginationLink href={createPageUrl(page)} isActive={page === currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
