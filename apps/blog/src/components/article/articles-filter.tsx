import { Search, Filter } from 'lucide-react';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@imkdw-dev/ui';
import { ITagDto } from '@imkdw-dev/types';

interface ArticlesFilterTranslations {
  searchPlaceholder: string;
  sortPlaceholder: string;
  sortLatest: string;
  filterAll: string;
}

interface Props {
  searchQuery: string;
  selectedTag: string;
  sortBy: string;
  tags: ITagDto[];
  onSearchChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onSortChange: (value: string) => void;
  translations: ArticlesFilterTranslations;
}

export function ArticlesFilter({
  searchQuery,
  selectedTag,
  sortBy,
  tags,
  onSearchChange,
  onTagChange,
  onSortChange,
  translations,
}: Props) {
  const allTags = ['all', ...tags.map(tag => tag.name)];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 mb-6 md:mb-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={translations.searchPlaceholder}
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-28 sm:w-36 md:w-40">
                <SelectValue placeholder={translations.sortPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">{translations.sortLatest}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTagChange(tag)}
              className="text-xs h-8 px-3"
            >
              {tag === 'all' ? translations.filterAll : tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
