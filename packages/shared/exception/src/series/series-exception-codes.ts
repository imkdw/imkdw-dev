export const SERIES_EXCEPTION_CODES = {
  // 시리즈를 찾을 수 없음
  SERIES_NOT_FOUND: 'SERIES-0001',

  // 시리즈 제목 중복
  EXIST_SERIES_TITLE: 'SERIES-0002',

  // 시리즈 슬러그 중복
  EXIST_SERIES_SLUG: 'SERIES-0003',
} as const;

type SeriesExceptionCode = (typeof SERIES_EXCEPTION_CODES)[keyof typeof SERIES_EXCEPTION_CODES];

export const SERIES_EXCEPTION_MESSAGES: Record<SeriesExceptionCode, string> = {
  [SERIES_EXCEPTION_CODES.SERIES_NOT_FOUND]: '시리즈를 찾을 수 없습니다.',
  [SERIES_EXCEPTION_CODES.EXIST_SERIES_TITLE]: '이미 존재하는 시리즈 제목입니다.',
  [SERIES_EXCEPTION_CODES.EXIST_SERIES_SLUG]: '이미 존재하는 시리즈 슬러그입니다.',
} as const;
