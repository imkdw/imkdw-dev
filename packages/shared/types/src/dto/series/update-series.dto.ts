export interface IUpdateSeriesDto {
  /**
   * 시리즈 제목
   */
  title: string;

  /**
   * 시리즈 설명
   */
  description: string;

  /**
   * 시리즈 태그 목록
   */
  tags: string[];
}
