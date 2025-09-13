import { FileText, Hash, Terminal } from 'lucide-react';
import { Button } from '../../../primitives/button';
import { SearchInput } from './search-input';

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface Props {
  isOpen: boolean;
  navigation?: NavigationItem[];
  onNavigate?: (path: string) => void;
  onClose?: () => void;
  onSearch?: (query: string) => void;
}

const defaultNavigation: NavigationItem[] = [
  { name: 'Articles', icon: FileText, path: '/articles' },
  { name: 'Series', icon: Hash, path: '/series' },
  { name: 'Terminal', icon: Terminal, path: '/terminal' },
];

export function MobileNavigation({ isOpen, navigation = defaultNavigation, onNavigate, onClose, onSearch }: Props) {
  const handleNavigate = (path: string) => {
    onNavigate?.(path);
    onClose?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="md:hidden border-b border-border bg-muted/30 animate-fade-in">
      <div className="p-4 space-y-3">
        {/* Mobile search */}
        <SearchInput variant="mobile" placeholder="Search files..." onSearch={onSearch} />

        {/* Mobile navigation */}
        <div className="space-y-1">
          {navigation.map(item => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start text-sm"
              onClick={() => handleNavigate(item.path)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
