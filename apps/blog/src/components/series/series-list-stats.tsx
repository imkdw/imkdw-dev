interface Props {
  totalSeriesCount: number;
  totalArticleCount: number;
}

export function SeriesListStats({ totalSeriesCount, totalArticleCount }: Props) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4 pt-4 md:pt-6">
      <div className="bg-card rounded-lg p-3 md:p-4 flex-1 min-w-[calc(50%-0.375rem)] md:min-w-[calc(50%-0.5rem)]">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm text-muted-foreground truncate">전체 시리즈</p>
            <p className="text-lg md:text-2xl font-bold">{totalSeriesCount}</p>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg p-3 md:p-4 flex-1 min-w-[calc(50%-0.375rem)] md:min-w-[calc(50%-0.5rem)]">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm text-muted-foreground truncate">총 글 수</p>
            <p className="text-lg md:text-2xl font-bold">{totalArticleCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
