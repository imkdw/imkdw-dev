export const SERIES_EXCEPTION_CODES = {
  // 시리즈를 찾을 수 없음
  SERIES_NOT_FOUND: 'SERIES-0001',

  // 시리즈 제목 중복
  EXIST_SERIES_TITLE: 'SERIES-0002',

  // 시리즈 슬러그 중복
  EXIST_SERIES_SLUG: 'SERIES-0003',
} as const;