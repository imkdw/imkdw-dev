import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import { Providers } from '../../components/providers';
import { MobileSidebar } from '../../components/sidebar/mobile-sidebar';
import { NavigationProgress } from '../../components/navigation-progress';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_ENV } from '@imkdw-dev/consts';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL ?? 'https://blog.imkdw.dev';

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteTitle')}`,
    },
    description: t('siteDescription'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      locale: locale,
      alternateLocale: routing.locales.filter(l => l !== locale),
    },
  };
}

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
