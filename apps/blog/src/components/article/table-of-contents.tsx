import { TableOfContentsItem } from '../../types/article';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="bg-card p-4 rounded-md shadow-sm">
      <h3 className="font-semibold mb-4 text-primary">목차</h3>
      <nav className="space-y-2 text-sm">
        {items.map(item => (
          <a
            key={item.id}
            href={item.href}
            className={`block hover:text-foreground transition-colors scroll-smooth ${
              item.level === 1
                ? 'text-primary font-medium'
                : item.level === 2
                  ? 'text-muted-foreground hover:text-foreground transition-colors ml-4'
                  : 'text-muted-foreground hover:text-foreground transition-colors ml-8'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
