export interface IUpdateArticleDto {
  /**
   * 게시글 제목
   */
  title: string;

  /**
   * 게시글 내용
   */
  content: string;

  /**
   * 시리즈 ID
   */
  seriesId: string;
}
