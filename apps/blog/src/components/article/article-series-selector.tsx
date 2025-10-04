'use client';

import { useEffect, useState } from 'react';
import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@imkdw-dev/ui';
import { getSeriesList } from '@imkdw-dev/actions';
import { ISeriesListItemDto } from '@imkdw-dev/types';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

export function ArticleSeriesSelector({ value, onValueChange }: Props) {
  const [seriesList, setSeriesList] = useState<ISeriesListItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setIsLoading(true);
        const response = await getSeriesList({ page: 1, limit: 100 });
        setSeriesList(response.items);
      } finally {
        setIsLoading(false);
      }
    };

    loadSeries();
  }, []);

  const selectedSeries = seriesList.find(series => series.id === value);

  return (
    <Card className="p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <label className="text-sm font-medium mb-3">시리즈 *</label>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoading ? '로딩 중...' : (selectedSeries?.title ?? '시리즈를 선택하세요')} />
          </SelectTrigger>
          <SelectContent className="!max-h-[320px]">
            {seriesList.map(series => (
              <SelectItem key={series.id} value={series.id}>
                {series.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground/70 mt-2">게시글이 속할 시리즈를 선택하세요</p>
      </div>
    </Card>
  );
}
