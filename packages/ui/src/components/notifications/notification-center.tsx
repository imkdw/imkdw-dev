'use client';

import { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Button } from '../../primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';

export interface Props {
  className?: string;
}

export const NotificationCenter = ({ className }: Props) => {
  const [notifications] = useState([
    { id: 1, title: '새 댓글', message: '당신의 게시물에 새 댓글이 달렸습니다.', read: false },
    { id: 2, title: '시스템 업데이트', message: '시스템이 성공적으로 업데이트되었습니다.', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ghost text-xs h-6 px-2 relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
        <Bell className="h-3 w-3" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="text-xs flex items-center justify-between">
          알림
          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
            모두 읽음
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            알림이 없습니다.
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="cursor-pointer p-3">
              <div className="flex items-start space-x-2 w-full">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium truncate">
                      {notification.title}
                    </span>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 opacity-60 hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </DropdownMenuItem>
          ))
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center justify-center text-sm">
          모든 알림 보기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

