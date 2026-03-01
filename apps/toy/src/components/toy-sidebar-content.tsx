'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Image, ImagePlus, Sparkles, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn, SidebarContent, SidebarGroup, SidebarGroupContent } from '@imkdw-dev/ui';

interface Tool {
  name: string;
  href: string;
  icon: LucideIcon;
  status?: string;
}

interface Category {
  name: string;
  href: string;
  icon: LucideIcon;
  tools?: Tool[];
}

const categories: Category[] = [
  { name: '홈', href: '/', icon: Home },
  {
    name: '이미지',
    href: '/image',
    icon: Image,
    tools: [
      { name: '배경 합성', href: '/image/compose', icon: ImagePlus },
      { name: 'WebP 최적화', href: '/image/optimize', icon: Sparkles },
    ],
  },
];

export function ToySidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup className="pt-2">
        <SidebarGroupContent>
          <nav className="space-y-0.5 px-1">
            {categories.map(category => (
              <TreeItem key={category.href} category={category} pathname={pathname} />
            ))}
          </nav>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

interface TreeItemProps {
  category: Category;
  pathname: string;
}

function TreeItem({ category, pathname }: TreeItemProps) {
  const tools = category.tools ?? [];
  const hasTools = tools.length > 0;
  const hasActiveChild = hasTools && tools.some(tool => pathname.startsWith(tool.href));
  const isActive = category.href === '/' ? pathname === '/' : !hasActiveChild && pathname.startsWith(category.href);
  const [isOpen, setIsOpen] = useState(isActive && hasTools);

  useEffect(() => {
    if (isActive && hasTools) setIsOpen(true);
  }, [isActive, hasTools]);

  return (
    <div>
      <Link
        href={category.href}
        onClick={e => {
          if (hasTools) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <category.icon className="h-5 w-5 shrink-0" />
        <span className="flex-1">{category.name}</span>
        {hasTools && (
          <>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-2xs font-normal leading-none text-muted-foreground">
              {tools.length}
            </span>
            <ChevronRight
              className={cn(
                'h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200',
                isOpen && 'rotate-90'
              )}
            />
          </>
        )}
      </Link>

      {hasTools && (
        <div
          className={cn(
            'grid transition-all duration-200 ease-in-out',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="overflow-hidden">
            <div className="ml-2.5 mt-1 border-l border-border/40">
              {tools.map((tool, index) => {
                const isToolActive = pathname.startsWith(tool.href);
                const isLast = index === tools.length - 1;

                return (
                  <div key={tool.href} className="relative">
                    <div className="absolute left-0 top-1/2 h-px w-3 bg-border/40" />
                    {isLast && <div className="absolute bottom-0 -left-px top-1/2 w-px bg-sidebar" />}
                    <Link
                      href={tool.href}
                      className={cn(
                        'ml-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        isToolActive
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <tool.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate">{tool.name}</span>
                      {tool.status && <span className="text-2xs italic text-muted-foreground/50">{tool.status}</span>}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
