import { TagsListProps } from './types';

export function TagsList({ tags }: TagsListProps) {
  return (
    <div className="flex flex-wrap gap-1 md:gap-2">
      {tags.map(tag => (
        <span
          key={tag}
          className="tracking-wider inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm border border-primary/20 hover:bg-primary/20 cursor-pointer transition-colors"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
