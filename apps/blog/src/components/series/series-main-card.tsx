import { Card, CardContent, Badge } from '@imkdw-dev/ui';
import { BookOpen } from 'lucide-react';
import { SeriesActions } from './series-actions';
import type { SeriesData } from '../../types/series';

interface Props {
  seriesData: Pick<SeriesData, 'title' | 'description' | 'tags'>;
}

export function SeriesMainCard({ seriesData }: Props) {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-secondary/80 shadow-lg">
      <CardContent className="p-0">
        {/* 상단 액션 바 */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-muted-foreground">시리즈</p>
            </div>
          </div>
          <SeriesActions />
        </div>

        {/* 시리즈 정보 */}
        <div className="p-6 md:p-8">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              {seriesData.title}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0">
              {seriesData.description}
            </p>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
            {seriesData.tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover-scale"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
