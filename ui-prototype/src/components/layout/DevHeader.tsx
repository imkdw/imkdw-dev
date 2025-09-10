import { useState } from 'react';
import { 
  Search, 
  Settings, 
  Terminal, 
  FileText, 
  FolderOpen, 
  Hash,
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  Monitor,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';
import LoginModal from '@/components/auth/LoginModal';
import UserMenu from '@/components/auth/UserMenu';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DevHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('blog.tsx');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ko');
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // 임시 사용자 상태 (실제로는 전역 상태 관리나 context 사용)
  const [user, setUser] = useState<any>(null);
  
  const handleLogin = () => {
    setIsLoginOpen(true);
  };
  
  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };
  
  const handleLogout = () => {
    setUser(null);
    console.log('로그아웃');
  };

  const tabs = [
    { name: 'blog.tsx', active: true },
    { name: 'articles.ts', active: false },
    { name: 'series.json', active: false },
  ];

  const navigation = [
    { name: 'Articles', icon: FileText, path: '/articles' },
    { name: 'Series', icon: Hash, path: '/series' },
    { name: 'Terminal', icon: Terminal, path: '/terminal' },
  ];

  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const themes = [
    { value: 'light', label: '라이트', icon: Sun },
    { value: 'dark', label: '다크', icon: Moon },
    { value: 'system', label: '시스템', icon: Monitor },
  ];

  const getCurrentLanguage = () => languages.find(lang => lang.code === currentLanguage);
  const getCurrentTheme = () => themes.find(t => t.value === theme) || themes[0];

  return (
    <header className="w-full border-b border-border bg-background">
      {/* VS Code style title bar */}
      <div className="terminal-header">
        <div className="flex items-center space-x-4">
          <div className="window-controls">
            <div className="control-dot close"></div>
            <div className="control-dot minimize"></div>
            <div className="control-dot maximize"></div>
          </div>
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono font-medium">DevBlog</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                <Globe className="h-3 w-3 mr-1" />
                {getCurrentLanguage()?.flag}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel className="text-xs">언어 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => setCurrentLanguage(language.code)}
                  className={`cursor-pointer ${currentLanguage === language.code ? 'bg-muted' : ''}`}
                >
                  <span className="mr-2">{language.flag}</span>
                  <span className="text-sm">{language.name}</span>
                  {currentLanguage === language.code && (
                    <span className="ml-auto text-xs text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                {(() => {
                  const ThemeIcon = getCurrentTheme().icon;
                  return <ThemeIcon className="h-3 w-3 mr-1" />;
                })()}
                {getCurrentTheme().label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuLabel className="text-xs">테마 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <DropdownMenuItem
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value)}
                    className={`cursor-pointer ${theme === themeOption.value ? 'bg-muted' : ''}`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span className="text-sm">{themeOption.label}</span>
                    {theme === themeOption.value && (
                      <span className="ml-auto text-xs text-primary">✓</span>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* 로그인 시에만 알림 표시 */}
          {user && <NotificationCenter />}
          
          <UserMenu 
            user={user} 
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </div>
      </div>

      {/* Editor tabs */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30">
        <div className="flex items-center min-w-0 flex-1">
          {/* Sidebar Toggle - 모바일에서만 */}
          <div className="md:hidden flex-shrink-0 px-2">
            <SidebarTrigger />
          </div>
          
          {/* File tabs */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 md:px-4 py-2 text-sm border-r border-border/50 transition-colors whitespace-nowrap flex-shrink-0 ${
                  tab.name === activeTab
                    ? 'bg-background text-foreground border-b-2 border-primary'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span className="font-mono text-xs md:text-sm">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and navigation - desktop */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4 px-2 lg:px-4">
          <div className="flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className="text-xs h-8 px-2"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-3 w-3 lg:mr-1" />
                <span className="hidden lg:inline">{item.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-7 pr-3 h-7 text-xs bg-muted/50 border-border/50 w-32 lg:w-40"
            />
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-border bg-muted/30 animate-fade-in">
          <div className="p-4 space-y-3">
            {/* Mobile search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-10 pr-4 bg-background"
              />
            </div>

            {/* Mobile navigation */}
            <div className="space-y-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
};

export default DevHeader;