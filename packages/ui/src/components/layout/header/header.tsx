'use client';

import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { SidebarTrigger } from '../../../primitives/sidebar';
import { NotificationCenter } from '../../notifications/notification-center';
import { UserMenu } from '../../auth/user-menu';
import { LoginModal } from '../../auth/login-modal';
import { MacOSControls } from '../../../primitives/macos-controls';
import { LanguageSelector } from './language-selector';
import { ThemeSelector } from './theme-selector';
import { FileTabs } from './file-tabs';
import { DesktopNavigation } from './desktop-navigation';
import { SearchInput } from './search-input';
import { MobileNavigation } from './mobile-navigation';
import { cn } from '../../../lib';
import { jetBrainsMono } from '@imkdw-dev/fonts';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Props {
  user?: User | null;
  theme?: string;
  onThemeChange?: (theme: string) => void;
  onNavigate?: (path: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
}

export function Header({ user: externalUser, theme, onThemeChange, onNavigate, onLogin, onLogout, onSearch }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('blog.tsx');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const [user, setUser] = useState<User | null>(externalUser || null);

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    onLogout?.();
  };

  const handleNavigate = (path: string) => {
    onNavigate?.(path);
  };

  const tabs = [
    { name: 'blog.tsx', active: true },
    { name: 'articles.ts', active: false },
    { name: 'series.json', active: false },
  ];

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="terminal-header items-center justify-between">
        <div className="flex items-center space-x-4">
          <MacOSControls className="window-controls" />
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className={cn('text-sm font-medium', jetBrainsMono.className)}>@imkdw-dev/blog</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
          <ThemeSelector theme={theme} onThemeChange={onThemeChange} />
          {user && <NotificationCenter />}
          <UserMenu
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigateToProfile={() => handleNavigate('/profile')}
            onNavigateToWrite={() => handleNavigate('/write')}
            onNavigateToSettings={() => handleNavigate('/settings')}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30">
        <div className="flex items-center min-w-0 flex-1">
          {/* Sidebar Toggle - 모바일에서만 */}
          <div className="md:hidden flex-shrink-0 px-2">
            <SidebarTrigger />
          </div>

          <FileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Search and navigation - desktop */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4 px-2 lg:px-4">
          <DesktopNavigation onNavigate={handleNavigate} />
          <SearchInput onSearch={onSearch} />
        </div>
      </div>

      <MobileNavigation
        isOpen={isMenuOpen}
        onNavigate={handleNavigate}
        onClose={() => setIsMenuOpen(false)}
        onSearch={onSearch}
      />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
    </header>
  );
}
