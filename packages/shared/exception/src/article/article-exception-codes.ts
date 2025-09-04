export const ARTICLE_EXCEPTION_CODES = {
  // 게시글 제목 중복
  EXIST_ARTICLE_TITLE: 'ARTICLE-0001',

  // 게시글 제목 유효성 검사 실패
  INVALID_ARTICLE_TITLE: 'ARTICLE-0002',

  // 게시글 내용 유효성 검사 실패
  INVALID_ARTICLE_CONTENT: 'ARTICLE-0003',
} as const;
