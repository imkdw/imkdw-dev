import { FileText, Hash, Terminal } from 'lucide-react';
import { Button } from '../../../primitives/button';

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface Props {
  navigation?: NavigationItem[];
  onNavigate?: (path: string) => void;
}

const defaultNavigation: NavigationItem[] = [
  { name: 'Articles', icon: FileText, path: '/articles' },
  { name: 'Series', icon: Hash, path: '/series' },
  { name: 'Terminal', icon: Terminal, path: '/terminal' },
];

export function DesktopNavigation({ navigation = defaultNavigation, onNavigate }: Props) {
  const handleNavigate = (path: string) => {
    onNavigate?.(path);
  };

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      {navigation.map(item => (
        <Button
          key={item.name}
          variant="ghost"
          size="sm"
          className="text-sm h-8 px-2"
          onClick={() => handleNavigate(item.path)}
        >
          <item.icon className="h-3 w-3 lg:mr-1" />
          <span className="hidden lg:inline">{item.name}</span>
        </Button>
      ))}
    </div>
  );
}
