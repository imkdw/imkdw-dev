export interface IArticleStatsDto {
  count: number;
  viewCount: number;
}

export interface ISeriesStatsDto {
  count: number;
}

export interface ITagStatsDto {
  count: number;
}

export interface IResponseGetStatsDto {
  article: IArticleStatsDto;
  series: ISeriesStatsDto;
  tag: ITagStatsDto;
}
