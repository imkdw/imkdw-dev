# Phase 3: 레이아웃 & 네비게이션

## 개요

레이아웃 컴포넌트와 네비게이션 컴포넌트에 i18n 적용

- **예상 소요**: 1일
- **선행 조건**: Phase 2 완료
- **커밋 단위**: 4개

---

## Task 3.1: 메시지 파일에 네비게이션 번역 추가

### 작업 내용

- `messages/ko.json`에 navigation, auth 네임스페이스 추가
- `messages/en.json`에 동일 구조 추가

### 파일 수정

#### `apps/blog/messages/ko.json`

```json
{
  "metadata": {
    "siteTitle": "@imkdw-dev/blog",
    "siteDescription": "직접 개발하고 운영하는 IT 기술블로그"
  },
  "navigation": {
    "home": "홈",
    "articles": "글 목록",
    "series": "시리즈",
    "explore": "탐색"
  },
  "auth": {
    "login": "로그인",
    "logout": "로그아웃",
    "loginWithGoogle": "Google로 로그인",
    "loginWithGithub": "Github로 로그인",
    "mypage": "마이페이지",
    "writeArticle": "글 작성",
    "autoSignup": "계정이 없으시면 자동으로 회원가입됩니다"
  }
}
```

#### `apps/blog/messages/en.json`

```json
{
  "metadata": {
    "siteTitle": "@imkdw-dev/blog",
    "siteDescription": "A tech blog I develop and operate myself"
  },
  "navigation": {
    "home": "Home",
    "articles": "Articles",
    "series": "Series",
    "explore": "Explore"
  },
  "auth": {
    "login": "Login",
    "logout": "Logout",
    "loginWithGoogle": "Login with Google",
    "loginWithGithub": "Login with Github",
    "mypage": "My Page",
    "writeArticle": "Write Article",
    "autoSignup": "If you don't have an account, you'll be signed up automatically"
  }
}
```

### 확인 사항

- [ ] `ko.json`에 navigation, auth 추가됨
- [ ] `en.json`에 동일 구조 추가됨
- [ ] JSON 문법 오류 없음

### 커밋

```
feat(blog): add navigation and auth translations

- Add navigation namespace (home, articles, series, explore)
- Add auth namespace (login, logout, social login labels)
```

---

## Task 3.2: MobileSidebar 컴포넌트 i18n 적용

### 작업 내용

- `MobileSidebar` 컴포넌트에 translations props 추가
- `[locale]/layout.tsx`에서 번역 전달

### 파일 수정

#### `apps/blog/src/components/sidebar/mobile-sidebar.tsx`

```tsx
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
      // locale prefix 제거 후 비교
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
```

#### `apps/blog/src/app/[locale]/layout.tsx` (수정)

```tsx
// ... 기존 imports
import { getTranslations } from 'next-intl/server';

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations('navigation');

  const navigationTranslations = {
    home: t('home'),
    articles: t('articles'),
    series: t('series'),
    explore: t('explore'),
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <NavigationProgress />
        {children}
        <MobileSidebar translations={navigationTranslations} />
      </Providers>
      {process.env.APP_ENV === APP_ENV.PRODUCTION && <GoogleAnalytics gaId="G-DXRR1KZDDN" />}
    </NextIntlClientProvider>
  );
}
```

### 확인 사항

- [ ] MobileSidebar에 translations props 추가됨
- [ ] 하드코딩된 한국어 텍스트 제거됨
- [ ] layout.tsx에서 번역 전달
- [ ] `/ko`, `/en` 에서 각각 올바른 언어로 표시됨

### 커밋

```
feat(blog): apply i18n to MobileSidebar component

- Add translations props to MobileSidebar
- Pass translations from locale layout
- Remove hardcoded Korean text
```

---

## Task 3.3: packages/ui Header 컴포넌트 수정

### 작업 내용

- `packages/ui`의 Header 관련 컴포넌트에 translations props 추가
- DesktopNavigation, MobileNavigation 수정
- UserMenu, LoginModal 수정

### 파일 수정

#### `packages/ui/src/components/layout/header/desktop-navigation.tsx`

```tsx
import { FileText, Hash } from 'lucide-react';
import { Button } from '../../../primitives/button';
import Link from 'next/link';

interface Props {
  translations: {
    articles: string;
    series: string;
  };
}

export function DesktopNavigation({ translations }: Props) {
  const navigation = [
    { name: translations.articles, icon: FileText, path: '/articles' },
    { name: translations.series, icon: Hash, path: '/series' },
  ];

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      {navigation.map(item => (
        <Button key={item.path} variant="ghost" size="sm" className="text-sm h-8 px-2" asChild>
          <Link href={item.path}>
            <item.icon className="h-3 w-3 lg:mr-1" />
            <span className="hidden lg:inline">{item.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
```

#### `packages/ui/src/components/layout/header/mobile-navigation.tsx`

```tsx
import { FileText, Hash } from 'lucide-react';
import { Button } from '../../../primitives/button';
import { SearchInput } from './search-input';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onSearch?: (query: string) => void;
  translations: {
    articles: string;
    series: string;
    searchPlaceholder: string;
  };
}

export function MobileNavigation({ isOpen, onSearch, translations }: Props) {
  const navigation = [
    { name: translations.articles, icon: FileText, path: '/articles' },
    { name: translations.series, icon: Hash, path: '/series' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <nav className="md:hidden border-b border-border bg-muted/30 animate-fade-in">
      <div className="p-4 space-y-3">
        <SearchInput variant="mobile" placeholder={translations.searchPlaceholder} onSearch={onSearch} />
        <div className="space-y-1">
          {navigation.map(item => (
            <Link href={item.path} key={item.path}>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

#### `packages/ui/src/components/auth/login-modal.tsx`

```tsx
'use client';

import { Chrome, Github } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../primitives/dialog';
import { OAuthProvider } from '@imkdw-dev/consts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSocialLogin: (provider: OAuthProvider) => void;
  translations: {
    title: string;
    loginWithGoogle: string;
    loginWithGithub: string;
    autoSignup: string;
  };
}

export function LoginModal({ isOpen, onClose, onSocialLogin, translations }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="text-center">{translations.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground"
            variant="outline"
            onClick={() => onSocialLogin('google')}
          >
            <Chrome className="h-5 w-5" />
            <span>{translations.loginWithGoogle}</span>
          </Button>
          <Button
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground"
            variant="outline"
            onClick={() => onSocialLogin('github')}
          >
            <Github className="h-5 w-5" />
            <span>{translations.loginWithGithub}</span>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">{translations.autoSignup}</div>
      </DialogContent>
    </Dialog>
  );
}
```

#### `packages/ui/src/components/auth/user-menu.tsx`

```tsx
'use client';

import { Edit, LogOut, User } from 'lucide-react';
import { Button, buttonVariants } from '../../primitives/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../primitives/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@imkdw-dev/auth';

interface Props {
  onLogin: () => void;
  onLogout?: () => Promise<void>;
  translations: {
    login: string;
    logout: string;
    mypage: string;
    writeArticle: string;
  };
}

export function MemberMenu({ onLogin, onLogout, translations }: Props) {
  const router = useRouter();
  const { member, logout } = useAuth();

  if (!member) {
    return <Button onClick={onLogin}>{translations.login}</Button>;
  }

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }

    logout();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost' }), 'relative h-8 w-8 rounded-full')}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.profileImage} alt={member.email} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {member.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{member.nickname}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/members/${member.id}`} className="flex items-center justify-center">
            <User className="mr-2 h-4 w-4" />
            <span>{translations.mypage}</span>
          </Link>
        </DropdownMenuItem>
        {member.role === MEMBER_ROLE.ADMIN && (
          <DropdownMenuItem>
            <Link href={`/articles/create`} className="flex items-center justify-center">
              <Edit className="mr-2 h-4 w-4" />
              <span>{translations.writeArticle}</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="cursor-pointer" onClick={handleLogout}>
            {translations.logout}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### 확인 사항

- [ ] DesktopNavigation에 translations props 추가됨
- [ ] MobileNavigation에 translations props 추가됨
- [ ] LoginModal에 translations props 추가됨
- [ ] MemberMenu에 translations props 추가됨
- [ ] 모든 하드코딩된 텍스트 제거됨
- [ ] packages/ui 빌드 성공

### 커밋

```
feat(ui): add translations props to Header components

- Update DesktopNavigation with translations
- Update MobileNavigation with translations
- Update LoginModal with translations
- Update MemberMenu with translations
- Remove all hardcoded Korean/English text
```

---

## Task 3.4: Header 컴포넌트 통합 및 Layout 연결

### 작업 내용

- `packages/ui`의 Header 컴포넌트에 translations props 통합
- `apps/blog`의 Layout 컴포넌트에서 Header에 번역 전달

### 파일 수정

#### `packages/ui/src/components/layout/header/header.tsx`

```tsx
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
}

export function Header({ onSearch, onLogout, translations }: Props) {
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
        translations={translations.auth}
      />
    </header>
  );
}
```

#### `apps/blog/src/components/layout.tsx`

```tsx
import { Header, Footer, Layout as BaseLayout } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';

interface Props {
  children: React.ReactNode;
}

export async function Layout({ children }: Props) {
  const tNav = await getTranslations('navigation');
  const tAuth = await getTranslations('auth');

  const headerTranslations = {
    navigation: {
      articles: tNav('articles'),
      series: tNav('series'),
      searchPlaceholder: 'Search...', // TODO: 추후 번역 추가
    },
    auth: {
      login: tAuth('login'),
      logout: tAuth('logout'),
      loginWithGoogle: tAuth('loginWithGoogle'),
      loginWithGithub: tAuth('loginWithGithub'),
      mypage: tAuth('mypage'),
      writeArticle: tAuth('writeArticle'),
      autoSignup: tAuth('autoSignup'),
    },
  };

  return <BaseLayout header={<Header translations={headerTranslations} />}>{children}</BaseLayout>;
}
```

### 메시지 파일 업데이트 (searchPlaceholder 추가)

#### `apps/blog/messages/ko.json`

```json
{
  "navigation": {
    "home": "홈",
    "articles": "글 목록",
    "series": "시리즈",
    "explore": "탐색",
    "searchPlaceholder": "검색..."
  }
}
```

#### `apps/blog/messages/en.json`

```json
{
  "navigation": {
    "home": "Home",
    "articles": "Articles",
    "series": "Series",
    "explore": "Explore",
    "searchPlaceholder": "Search..."
  }
}
```

### 확인 사항

- [ ] Header에 translations props 통합됨
- [ ] Layout 컴포넌트가 async로 변경됨
- [ ] 번역이 Header에 전달됨
- [ ] `/ko`, `/en` 에서 올바른 언어로 표시됨
- [ ] 로그인 모달 텍스트 번역됨
- [ ] 사용자 메뉴 텍스트 번역됨

### 커밋

```
feat(blog): integrate i18n translations into Header and Layout

- Update Header component with translations prop
- Make Layout component async for server-side translation
- Pass navigation and auth translations to Header
- Add searchPlaceholder to navigation translations
```

---

## Phase 3 완료 체크리스트

- [ ] Task 3.1 완료 및 커밋
- [ ] Task 3.2 완료 및 커밋
- [ ] Task 3.3 완료 및 커밋
- [ ] Task 3.4 완료 및 커밋
- [ ] `/ko` 페이지에서 한국어 네비게이션 표시
- [ ] `/en` 페이지에서 영어 네비게이션 표시
- [ ] 로그인 모달 양쪽 언어에서 정상 동작
- [ ] packages/ui 빌드 성공
- [ ] apps/blog 빌드 성공

## 다음 Phase

Phase 3 완료 후 [Phase 4: 공통 컴포넌트](./04-phase-4-common.md)로 진행
