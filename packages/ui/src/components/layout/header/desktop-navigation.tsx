import { FileText, Hash, Terminal } from 'lucide-react';
import { Button } from '../../../primitives/button';
import Link from 'next/link';

export function DesktopNavigation() {
  const navigation = [
    { name: 'Articles', icon: FileText, path: '/articles' },
    { name: 'Series', icon: Hash, path: '/series' },
    { name: 'Terminal', icon: Terminal, path: '/terminal' },
  ];

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      {navigation.map(item => (
        <Button key={item.name} variant="ghost" size="sm" className="text-sm h-8 px-2" asChild>
          <Link href={item.path}>
            <item.icon className="h-3 w-3 lg:mr-1" />
            <span className="hidden lg:inline">{item.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
