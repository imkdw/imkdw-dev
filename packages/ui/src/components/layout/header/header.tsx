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
import { useOAuth } from '@imkdw-dev/hooks';

interface Props {
  onSearch?: (query: string) => void;
  onLogout?: () => Promise<void>;
  translations: {
    navigation: {
      articles: string;
      series: string;
      searchPlaceholder: string;
    };
    auth: {
      login: string;
      logout: string;
      loginWithGoogle: string;
      loginWithGithub: string;
      mypage: string;
      writeArticle: string;
      autoSignup: string;
    };
  };
  localeSwitcher: React.ReactNode;
  logoLink: React.ReactNode;
}

export function Header({ onSearch, onLogout, translations, localeSwitcher, logoLink }: Props) {
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
            {logoLink}
          </div>
        </div>

        <div className="flex items-center space-x-1 gap-2">
          {localeSwitcher}
          <MemberMenu onLogin={handleLogin} onLogout={onLogout} translations={translations.auth} />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30">
        <div className="flex items-center min-w-0 flex-1">
          <div className="md:hidden flex-shrink-0 px-2">
            <SidebarTrigger />
          </div>
          <FileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="hidden md:flex items-center space-x-2 lg:space-x-4 px-2 lg:px-4">
          <DesktopNavigation translations={translations.navigation} />
        </div>
      </div>
      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSearch={onSearch}
        translations={translations.navigation}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSocialLogin={handleSocialLogin}
        translations={{
          title: translations.auth.login,
          loginWithGoogle: translations.auth.loginWithGoogle,
          loginWithGithub: translations.auth.loginWithGithub,
          autoSignup: translations.auth.autoSignup,
        }}
      />
    </header>
  );
}
