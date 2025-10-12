interface Props {
  totalSeriesCount: number;
  totalArticleCount: number;
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card rounded-lg p-3 md:p-4 flex-1 min-w-[calc(50%-0.375rem)] md:min-w-[calc(50%-0.5rem)]">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-muted-foreground truncate">{label}</p>
          <p className="text-lg md:text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function SeriesListStats({ totalSeriesCount, totalArticleCount }: Props) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4 pt-4 md:pt-6">
      <StatCard label="전체 시리즈" value={totalSeriesCount} />
      <StatCard label="총 글 수" value={totalArticleCount} />
    </div>
  );
}
