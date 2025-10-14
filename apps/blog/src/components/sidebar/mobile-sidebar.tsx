'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
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

const mainItems = [
  { title: '홈', url: '/', icon: Home },
  { title: '글 목록', url: '/articles', icon: FileText },
  { title: '시리즈', url: '/series', icon: BookOpen },
];

export function MobileSidebar() {
  const currentPath = usePathname();
  const { close } = useSidebar();

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
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
        {/* 메인 네비게이션 */}
        <SidebarGroup>
          <SidebarGroupLabel>탐색</SidebarGroupLabel>
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
