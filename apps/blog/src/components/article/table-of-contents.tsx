'use client';

import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '../../types/article';

interface Props {
  content: string;
}

export function TableOfContents({ content }: Props) {
  const [items, setItems] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) {
      return;
    }

    const headings = article.querySelectorAll('h2, h3, h4');

    const tocItems: TableOfContentsItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      const title = heading.textContent || '';
      const id = heading.id || `heading-${index}`;

      if (!heading.id) {
        heading.id = id;
      }

      return {
        id,
        title,
        level,
        href: `#${id}`,
      };
    });

    setItems(tocItems);
  }, [content]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-card p-4 rounded-md shadow-sm w-[350px]">
      <h3 className="font-semibold mb-4 text-primary">목차</h3>
      <nav className="space-y-2 text-sm">
        {items.map(item => (
          <a
            key={item.id}
            href={item.href}
            className={`block hover:text-foreground transition-colors scroll-smooth overflow-hidden text-ellipsis whitespace-nowrap ${
              item.level === 2
                ? 'text-primary font-medium'
                : item.level === 3
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
