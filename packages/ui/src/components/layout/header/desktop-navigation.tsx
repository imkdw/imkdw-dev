import { FileText, Hash } from 'lucide-react';
import { Button } from '../../../primitives/button';
import Link from 'next/link';

interface Props {
  translations: {
    articles: string;
    series: string;
  };
}

export function DesktopNavigation({ translations }: Props) {
  const navigation = [
    { name: translations.articles, icon: FileText, path: '/articles' },
    { name: translations.series, icon: Hash, path: '/series' },
  ];

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      {navigation.map(item => (
        <Button key={item.path} variant="ghost" size="sm" className="text-sm h-8 px-2" asChild>
          <Link href={item.path}>
            <item.icon className="h-3 w-3 lg:mr-1" />
            <span className="hidden lg:inline">{item.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
