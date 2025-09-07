export interface ICreateArticleDto {
  /**
   * 게시글 제목
   */
  title: string;

  /**
   * 게시글 내용
   */
  content: string;
}

export interface IResponseCreateArticleDto {
  /**
   * 생성된 게시글 ID
   */
  id: string;
}
