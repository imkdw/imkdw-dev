export interface ICreateSeriesDto {
  /**
   * 시리즈 제목
   */
  title: string;

  /**
   * 시리즈 슬러그
   */
  slug: string;

  /**
   * 시리즈 설명
   */
  description: string;
}

export interface IResponseCreateSeriesDto {
  /**
   * 시리즈 ID
   */
  id: string;

  /**
   * 시리즈 슬러그
   */
  slug: string;
}
