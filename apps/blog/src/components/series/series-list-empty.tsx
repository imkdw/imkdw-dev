import { BookOpen } from 'lucide-react';

export function SeriesListEmpty() {
  return (
    <div className="flex flex-col items-center py-12">
      <BookOpen className="h-16 w-16 text-muted-foreground pb-4" />
      <h3 className="text-lg font-semibold pb-2">시리즈가 없습니다</h3>
      <p className="text-muted-foreground">새로운 시리즈를 기다려주세요</p>
    </div>
  );
}
