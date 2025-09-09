export interface ICreateArticleDto {
  /**
   * 게시글 제목
   */
  title: string;

  /**
   * 게시글 슬러그 (URL 경로)
   */
  slug: string;

  /**
   * 게시글 내용
   */
  content: string;

  /**
   * 시리즈 ID
   */
  seriesId: string;

  /**
   * 태그 목록
   */
  tags: string[];
}

export interface IResponseCreateArticleDto {
  /**
   * 생성된 게시글 ID
   */
  id: string;

  /**
   * 게시글 슬러그
   */
  slug: string;
}
