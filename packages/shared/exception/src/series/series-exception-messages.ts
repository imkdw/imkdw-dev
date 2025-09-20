import { SERIES_EXCEPTION_CODES } from './series-exception-codes';

type SeriesExceptionCode = (typeof SERIES_EXCEPTION_CODES)[keyof typeof SERIES_EXCEPTION_CODES];

export const SERIES_EXCEPTION_MESSAGES: Record<SeriesExceptionCode, string> = {
  [SERIES_EXCEPTION_CODES.SERIES_NOT_FOUND]: '시리즈를 찾을 수 없습니다.',
  [SERIES_EXCEPTION_CODES.EXIST_SERIES_TITLE]: '이미 존재하는 시리즈 제목입니다.',
  [SERIES_EXCEPTION_CODES.EXIST_SERIES_SLUG]: '이미 존재하는 시리즈 슬러그입니다.',
} as const;