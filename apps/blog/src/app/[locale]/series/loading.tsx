import { Layout } from '@/components/layout';

function ListHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex sm:items-center justify-between gap-4">
        <div className="h-8 md:h-9 w-24 bg-muted rounded animate-pulse" />
        <div className="h-10 w-28 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex gap-4">
        {[1, 2].map(i => (
          <div key={i} className="bg-card rounded-lg p-4 flex-1">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="h-3 md:h-4 w-20 bg-muted rounded animate-pulse mb-2" />
                <div className="h-6 md:h-8 w-12 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-6 w-6 md:h-8 md:w-8 bg-muted rounded animate-pulse flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeriesCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="h-32 md:h-40 bg-muted animate-pulse" />
      <div className="p-4">
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse mb-3" />
        <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-muted rounded animate-pulse mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 bg-muted rounded animate-pulse" />
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function PaginationSkeleton() {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-10 w-10 bg-muted rounded animate-pulse" />
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <ListHeaderSkeleton />
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full sm:w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)]">
                <SeriesCardSkeleton />
              </div>
            ))}
          </div>
          <PaginationSkeleton />
        </div>
      </div>
    </Layout>
  );
}
