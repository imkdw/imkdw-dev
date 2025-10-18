import { FileText, Hash } from 'lucide-react';
import { Button } from '../../../primitives/button';
import { SearchInput } from './search-input';
import Link from 'next/link';

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSearch?: (query: string) => void;
}

const navigation: NavigationItem[] = [
  { name: 'Articles', icon: FileText, path: '/articles' },
  { name: 'Series', icon: Hash, path: '/series' },
  // { name: 'Terminal', icon: Terminal, path: '/terminal' },
];

export function MobileNavigation({ isOpen, onSearch }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <nav className="md:hidden border-b border-border bg-muted/30 animate-fade-in">
      <div className="p-4 space-y-3">
        {/* Mobile search */}
        <SearchInput variant="mobile" placeholder="Search files..." onSearch={onSearch} />

        {/* Mobile navigation */}
        <div className="space-y-1">
          {navigation.map(item => (
            <Link href={item.path} key={item.name}>
              <Button key={item.name} variant="ghost" className="w-full justify-start text-sm">
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
