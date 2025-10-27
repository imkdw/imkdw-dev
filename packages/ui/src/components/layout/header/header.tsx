'use client';

import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { SidebarTrigger } from '../../../primitives/sidebar';
import { MemberMenu } from '../../auth/user-menu';
import { LoginModal } from '../../auth/login-modal';
import { MacOSControls } from '../../../primitives/macos-controls';
import { FileTabs } from './file-tabs';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';
import { cn } from '../../../lib';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { useOAuth } from '@imkdw-dev/hooks';
import Link from 'next/link';
import { IMemberDto } from '@imkdw-dev/types';

interface Props {
  currentMember: IMemberDto | null;
  onSearch?: (query: string) => void;
  onLogout?: () => Promise<void>;
}

export function Header({ currentMember, onSearch, onLogout }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('blog.tsx');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { handleSocialLogin } = useOAuth();

  const handleLogin = () => {
    setIsLoginOpen(true);
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

        <div className="flex items-center space-x-1 gap-2">
          <MemberMenu currentMember={currentMember} onLogin={handleLogin} onLogout={onLogout} />
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
          {/* <SearchInput onSearch={onSearch} /> */}
        </div>
      </div>
      <MobileNavigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onSearch={onSearch} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSocialLogin={handleSocialLogin} />
    </header>
  );
}
