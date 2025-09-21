export interface GetStatsResult {
  article: {
    count: number;
    viewCount: number;
  };
  series: {
    count: number;
  };
  tag: {
    count: number;
  };
}
