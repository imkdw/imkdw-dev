import { ReactNode } from 'react';
import { Layout as UILayout } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';
import { logout } from '@/actions/logout';

interface Props {
  children: ReactNode;
  className?: string;
  enableOverflow?: boolean;
}

export async function Layout({ children, className, enableOverflow }: Props) {
  const tNav = await getTranslations('navigation');
  const tAuth = await getTranslations('auth');

  const headerTranslations = {
    navigation: {
      articles: tNav('articles'),
      series: tNav('series'),
      searchPlaceholder: tNav('searchPlaceholder'),
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

  return (
    <UILayout className={className} enableOverflow={enableOverflow} onLogout={logout} translations={headerTranslations}>
      {children}
    </UILayout>
  );
}
