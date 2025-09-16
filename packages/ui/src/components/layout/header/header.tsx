'use client';

import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { SidebarTrigger } from '../../../primitives/sidebar';
import { NotificationCenter } from '../../notifications/notification-center';
import { UserMenu } from '../../auth/user-menu';
import { LoginModal } from '../../auth/login-modal';
import { MacOSControls } from '../../../primitives/macos-controls';
import { FileTabs } from './file-tabs';
import { DesktopNavigation } from './desktop-navigation';
import { SearchInput } from './search-input';
import { MobileNavigation } from './mobile-navigation';
import { cn } from '../../../lib';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { useAuth } from '@imkdw-dev/hooks';
import Link from 'next/link';
import { IMemberDto } from '@imkdw-dev/types';

interface Props {
  currentMember: IMemberDto | null;
  onNavigate?: (path: string) => void;
  onSearch?: (query: string) => void;
}

export function Header({ currentMember, onNavigate, onSearch }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('blog.tsx');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { handleSocialLogin } = useAuth();

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  const handleNavigate = (path: string) => {
    onNavigate?.(path);
  };

  const tabs = [
    { name: 'blog.tsx', active: true },
    { name: `Coming Soon...`, active: false },
  ];

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="terminal-header items-center justify-between">
        <div className="flex items-center space-x-4">
          <MacOSControls />
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-primary" />
            <Link className={cn('text-md', jetBrainsMono.className)} href="/">
              @imkdw-dev/blog
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {currentMember && <NotificationCenter />}
          <UserMenu
            currentMember={currentMember}
            onLogin={handleLogin}
            // TODO: 로그아웃 기능 추가
            onLogout={() => {}}
            onNavigateToProfile={() => handleNavigate('/profile')}
            onNavigateToWrite={() => handleNavigate('/write')}
            onNavigateToSettings={() => handleNavigate('/settings')}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30">
        <div className="flex items-center min-w-0 flex-1">
          {/* 사이드바 토글 - 모바일에서만 */}
          <div className="md:hidden flex-shrink-0 px-2">
            <SidebarTrigger />
          </div>
          <FileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* 데스크탑 환경 - 네비게이터, 검색창 */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4 px-2 lg:px-4">
          <DesktopNavigation />
          <SearchInput onSearch={onSearch} />
        </div>
      </div>

      <MobileNavigation
        isOpen={isMenuOpen}
        onNavigate={handleNavigate}
        onClose={() => setIsMenuOpen(false)}
        onSearch={onSearch}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSocialLogin={handleSocialLogin} />
    </header>
  );
}
