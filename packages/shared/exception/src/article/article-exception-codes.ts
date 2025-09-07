export const ARTICLE_EXCEPTION_CODES = {
  // 게시글 제목 중복
  EXIST_ARTICLE_TITLE: 'ARTICLE-0001',

  // 게시글 제목 유효성 검사 실패
  INVALID_ARTICLE_TITLE: 'ARTICLE-0002',

  // 게시글 내용 유효성 검사 실패
  INVALID_ARTICLE_CONTENT: 'ARTICLE-0003',

  // 게시글을 찾을 수 없음
  ARTICLE_NOT_FOUND: 'ARTICLE-0004',

  // 게시글 슬러그 중복
  EXIST_ARTICLE_SLUG: 'ARTICLE-0005',
} as const;
