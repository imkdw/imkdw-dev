import { Layout } from '@/components/layout';

function ArticleHeaderSkeleton() {
  return (
    <div>
      {/* Series badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-32 bg-muted rounded-full animate-pulse" />
      </div>

      {/* Title */}
      <div className="h-8 sm:h-10 lg:h-12 w-full bg-muted rounded animate-pulse mb-3" />
      <div className="h-8 sm:h-10 lg:h-12 w-2/3 bg-muted rounded animate-pulse mb-6" />

      {/* Meta info and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-muted rounded animate-pulse" />
          <div className="h-9 w-9 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function ArticleContentSkeleton() {
  return (
    <article className="prose prose-lg max-w-none mt-8">
      {/* Content paragraphs */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      </div>

      {/* Image placeholder */}
      <div className="h-64 md:h-80 w-full bg-muted rounded-lg animate-pulse my-8" />

      <div className="space-y-4">
        <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
      </div>

      {/* Code block placeholder */}
      <div className="h-48 w-full bg-muted rounded-lg animate-pulse my-8" />

      <div className="space-y-4">
        <div className="h-6 w-1/4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
      </div>
    </article>
  );
}

function ArticleNavigationSkeleton() {
  return (
    <div className="flex justify-between gap-4 mt-12 pt-8 border-t border-border">
      <div className="flex-1 max-w-[45%]">
        <div className="h-3 w-16 bg-muted rounded animate-pulse mb-2" />
        <div className="h-5 w-full bg-muted rounded animate-pulse" />
      </div>
      <div className="flex-1 max-w-[45%] text-right">
        <div className="h-3 w-16 bg-muted rounded animate-pulse mb-2 ml-auto" />
        <div className="h-5 w-full bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

function TableOfContentsSkeleton() {
  return (
    <div className="bg-card p-4 rounded-md shadow-sm w-[350px]">
      <div className="h-5 w-24 bg-muted rounded animate-pulse mb-4" />
      <nav className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-muted rounded animate-pulse"
            style={{
              width: `${60 + Math.random() * 30}%`,
              marginLeft: i % 3 === 0 ? 0 : i % 3 === 1 ? 16 : 32,
            }}
          />
        ))}
      </nav>
    </div>
  );
}

function CommentSectionSkeleton() {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="h-6 w-24 bg-muted rounded animate-pulse mb-6" />
      {/* Comment form */}
      <div className="h-24 w-full bg-muted rounded-lg animate-pulse mb-8" />
      {/* Comment items */}
      <div className="space-y-6">
        {[1, 2].map(i => (
          <div key={i} className="flex gap-3">
            <div className="h-10 w-10 bg-muted rounded-full animate-pulse flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-muted rounded animate-pulse mb-1" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <Layout enableOverflow={false}>
      {/* Reading progress bar placeholder */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50" />

      <div className="max-w-7xl mx-auto p-6 lg:flex lg:gap-8">
        <div className="flex-1 max-w-4xl flex flex-col">
          <ArticleHeaderSkeleton />
          <ArticleContentSkeleton />
          <ArticleNavigationSkeleton />
          <CommentSectionSkeleton />
        </div>
        <aside className="hidden lg:block sticky top-4 self-start">
          <TableOfContentsSkeleton />
        </aside>
      </div>
    </Layout>
  );
}
