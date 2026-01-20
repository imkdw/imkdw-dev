import type { ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../../primitives/input';

interface Props {
  placeholder?: string;
  className?: string;
  variant?: 'desktop' | 'mobile';
  onSearch?: (query: string) => void;
}

export function SearchInput({ placeholder = 'Search...', className = '', variant = 'desktop', onSearch }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`}>
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder={placeholder} className="pl-10 pr-4 bg-background" onChange={handleChange} />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-7 pr-3 h-7 text-xs bg-muted/50 border-border/50 w-32 lg:w-40"
        onChange={handleChange}
      />
    </div>
  );
}
