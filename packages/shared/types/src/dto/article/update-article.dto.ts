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

  /**
   * 태그 목록
   */
  tags: string[];

  /**
   * 업로드한 이미지 주소 목록
   */
  uploadedImageUrls: string[];
}
