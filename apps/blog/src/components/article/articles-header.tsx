import { FileText, Tag } from 'lucide-react';

interface Props {
  totalArticles: number;
  totalTags: number;
}

export function ArticlesHeader({ totalArticles, totalTags }: Props) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
        <h1 className="text-2xl md:text-3xl font-bold">게시글</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="bg-card rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-muted-foreground truncate">전체 게시글</p>
              <p className="text-lg md:text-2xl font-bold">{totalArticles}</p>
            </div>
            <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-3 md:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-muted-foreground truncate">태그</p>
              <p className="text-lg md:text-2xl font-bold">{totalTags}</p>
            </div>
            <Tag className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
