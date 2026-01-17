import { Layout } from '@/components/layout';

function TerminalSectionSkeleton() {
  return (
    <section className="py-4 md:py-6 lg:py-8 bg-muted/20 border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch">
          {/* Terminal window skeleton */}
          <div className="terminal-window h-full flex flex-col min-h-[300px] md:min-h-[350px] bg-card rounded-lg border border-border">
            {/* Terminal header */}
            <div className="flex items-center gap-2 p-3 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-muted animate-pulse" />
              </div>
              <div className="h-4 w-32 bg-muted rounded animate-pulse ml-2" />
            </div>
            {/* Terminal content */}
            <div className="flex-1 p-4 space-y-3">
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Right side content skeleton */}
          <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-center">
            <div>
              <div className="h-6 md:h-8 w-3/4 bg-muted rounded animate-pulse mb-2 md:mb-3" />
              <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            </div>
            {/* Stats grid skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-card rounded-lg p-3 md:p-4 border border-border">
                  <div className="h-3 w-16 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-6 w-12 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-1 md:gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-7 w-20 bg-muted rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentSectionSkeleton({ itemCount = 2 }: { itemCount?: number }) {
  return (
    <section className="bg-background border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-muted rounded-lg w-9 h-9 animate-pulse" />
          <div>
            <div className="h-5 w-32 bg-muted rounded animate-pulse mb-1" />
            <div className="h-3 w-40 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="h-9 w-24 bg-muted rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4">
            <div className="h-40 bg-muted rounded-md animate-pulse mb-4" />
            <div className="h-5 w-3/4 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <Layout>
      <div>
        <TerminalSectionSkeleton />
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 space-y-8 md:space-y-10">
          <RecentSectionSkeleton itemCount={2} />
          <RecentSectionSkeleton itemCount={4} />
        </div>
      </div>
    </Layout>
  );
}
