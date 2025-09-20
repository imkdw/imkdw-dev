interface Params<T> {
  items: T[];
  totalCount: number;
  limit: number;
  page: number;
}

interface OffsetPagingResult<T> {
  items: T[];
  totalPage: number;
  haveNext: boolean;
  havePrev: boolean;
  totalCount: number;
}

export const getOffsetPagingResult = <T>(params: Params<T>): OffsetPagingResult<T> => {
  const { page, items, limit, totalCount } = params;
  const totalPage = Math.ceil(totalCount / limit) || 0;
  const haveNext = page < totalPage;
  const havePrev = page > 1;

  return {
    items,
    totalPage,
    haveNext,
    havePrev,
    totalCount,
  };
};

export function createOffset(limit: number, page: number) {
  const offset = limit * (page - 1);
  const nextOffSet = limit * page;

  return { offset, nextOffSet };
}
