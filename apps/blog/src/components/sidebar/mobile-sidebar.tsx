'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, FileText, BookOpen, PenTool, User, Clock, Star } from 'lucide-react';
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

const utilityItems = [
  { title: '글 작성', url: '/write', icon: PenTool },
  { title: '프로필', url: '/profile', icon: User },
  { title: '알림', url: '/notifications', icon: Clock },
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

        {/* 도구 */}
        <SidebarGroup>
          <SidebarGroupLabel>도구</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityItems.map(item => (
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

        {/* 빠른 링크 */}
        <SidebarGroup>
          <SidebarGroupLabel>빠른 링크</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div
                    className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={close}
                  >
                    <Star className="h-4 w-4" />
                    <span>북마크한 글</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div
                    className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={close}
                  >
                    <Clock className="h-4 w-4" />
                    <span>최근 읽은 글</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
