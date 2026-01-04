import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { cn } from '../../lib';

interface HeaderTranslations {
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
}

const DEFAULT_TRANSLATIONS: HeaderTranslations = {
  navigation: {
    articles: 'Articles',
    series: 'Series',
    searchPlaceholder: 'Search...',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    loginWithGoogle: 'Login with Google',
    loginWithGithub: 'Login with Github',
    mypage: 'My Page',
    writeArticle: 'Write Article',
    autoSignup: "If you don't have an account, you'll be signed up automatically",
  },
};

interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
  onLogout?: () => Promise<void>;
  translations?: HeaderTranslations;
  localeSwitcher: ReactNode;
}

export function Layout({
  children,
  className = '',
  enableOverflow = true,
  onLogout,
  translations,
  localeSwitcher,
}: Props) {
  const headerTranslations = translations ?? DEFAULT_TRANSLATIONS;

  return (
    <main className={cn('min-h-screen bg-background text-foreground flex flex-col', className)}>
      <Header onLogout={onLogout} translations={headerTranslations} localeSwitcher={localeSwitcher} />
      <main className={cn('flex-1', enableOverflow && 'overflow-auto')}>{children}</main>
      <Footer />
    </main>
  );
}
