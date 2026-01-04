'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Home, FileText, BookOpen } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@imkdw-dev/ui';

interface Props {
  translations: {
    home: string;
    articles: string;
    series: string;
    explore: string;
  };
}

export function MobileSidebar({ translations }: Props) {
  const currentPath = usePathname();
  const { close } = useSidebar();

  const mainItems = [
    { title: translations.home, url: '/', icon: Home },
    { title: translations.articles, url: '/articles', icon: FileText },
    { title: translations.series, url: '/series', icon: BookOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      const pathWithoutLocale = currentPath.replace(/^\/(ko|en)/, '');
      return pathWithoutLocale === '' || pathWithoutLocale === '/';
    }
    return currentPath.includes(path);
  };

  const getNavCls = (path: string) => {
    const active = isActive(path);

    return active
      ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary'
      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground';
  };

  return (
    <Sidebar className="bg-card">
      <SidebarContent className="pt-6">
        <SidebarGroup>
          <SidebarGroupLabel>{translations.explore}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      onClick={close}
                      className={`${getNavCls(item.url)} flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
