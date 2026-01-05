import { FileText, Hash } from 'lucide-react';
import { Button } from '../../../primitives/button';
import { SearchInput } from './search-input';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSearch?: (query: string) => void;
  translations: {
    articles: string;
    series: string;
    searchPlaceholder: string;
  };
}

export function MobileNavigation({ isOpen, onSearch, translations }: Props) {
  const navigation = [
    { name: translations.articles, icon: FileText, path: '/articles' },
    { name: translations.series, icon: Hash, path: '/series' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <nav className="md:hidden border-b border-border bg-muted/30 animate-fade-in">
      <div className="p-4 space-y-3">
        <SearchInput variant="mobile" placeholder={translations.searchPlaceholder} onSearch={onSearch} />
        <div className="space-y-1">
          {navigation.map(item => (
            <Link href={item.path} key={item.path}>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
