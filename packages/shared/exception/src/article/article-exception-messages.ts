import { ARTICLE_EXCEPTION_CODES } from './article-exception-codes';

type ArticleExceptionCode = (typeof ARTICLE_EXCEPTION_CODES)[keyof typeof ARTICLE_EXCEPTION_CODES];

export const ARTICLE_EXCEPTION_MESSAGES: Record<ArticleExceptionCode, string> = {
  [ARTICLE_EXCEPTION_CODES.EXIST_ARTICLE_TITLE]: '이미 존재하는 게시글 제목입니다.',
  [ARTICLE_EXCEPTION_CODES.INVALID_ARTICLE_TITLE]: '올바르지 않은 게시글 제목입니다.',
  [ARTICLE_EXCEPTION_CODES.INVALID_ARTICLE_CONTENT]: '올바르지 않은 게시글 내용입니다.',
  [ARTICLE_EXCEPTION_CODES.ARTICLE_NOT_FOUND]: '게시글을 찾을 수 없습니다.',
  [ARTICLE_EXCEPTION_CODES.EXIST_ARTICLE_SLUG]: '이미 존재하는 게시글 슬러그입니다.',
} as const;