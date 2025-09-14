export const ARTICLE_COMMENT_EXCEPTION_CODES = {
  // 게시글 댓글을 찾을 수 없음
  ARTICLE_COMMENT_NOT_FOUND: 'ARTICLE-COMMENT-0001',

  // 답글에는 답글을 작성할 수 없음
  CANNOT_REPLY_TO_REPLY: 'ARTICLE-COMMENT-0002',
} as const;
