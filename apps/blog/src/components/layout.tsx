import { ReactNode } from 'react';
import { Layout as UILayout, cn } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';
import { logout } from '@/actions/logout';
import { LocaleSwitcher } from './locale-switcher';
import { Link } from '@/i18n/navigation';
import { jetBrainsMono } from '@imkdw-dev/fonts';

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
    <UILayout
      className={className}
      enableOverflow={enableOverflow}
      onLogout={logout}
      translations={headerTranslations}
      localeSwitcher={<LocaleSwitcher />}
      logoLink={
        <Link className={cn('text-md', jetBrainsMono.className)} href="/">
          @imkdw-dev/blog
        </Link>
      }
    >
      {children}
    </UILayout>
  );
}
