export interface IRequestOffsetPagingDto {
  limit: number;
  page: number;
}

export interface IResponseOffsetPagingDto {
  havePrev: boolean;
  haveNext: boolean;
  totalCount: number;
  totalPage: number;
}

export interface IOffsetPagingListDto<T> extends IResponseOffsetPagingDto {
  items: T[];
}