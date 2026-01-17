'use client';

import { useTranslations } from 'next-intl';

import '@imkdw-dev/ui/globals.css';

import { routing, type Locale } from '@/i18n/routing';

const isDevelopment = process.env.NODE_ENV === 'development';

function getLocaleFromPath(): Locale {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const localePattern = new RegExp(`^\\/(${routing.locales.join('|')})`);
    const localeMatch = pathname.match(localePattern);
    if (localeMatch) {
      return localeMatch[1] as Locale;
    }
    const browserLang = navigator.language.toLowerCase();
    for (const locale of routing.locales) {
      if (browserLang.startsWith(locale)) {
        return locale;
      }
    }
  }
  return routing.defaultLocale;
}

interface ErrorDetails {
  message: string;
  stack?: string;
  digest?: string;
  cause?: unknown;
}

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = getLocaleFromPath();
  const t = useTranslations('errors.global');

  const errorDetails: ErrorDetails = {
    message: error.message || 'Unknown error',
    stack: error.stack,
    digest: error.digest,
    cause: error.cause,
  };

  return (
    <html lang={locale}>
      <body className="bg-background text-foreground">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-sm">
            <div className="flex flex-col items-center space-y-1.5 p-6 text-center">
              <h2 className="text-2xl font-bold text-destructive">{t('title')}</h2>
            </div>
            <div className="p-6 pt-0 text-center space-y-4">
              <p className="text-muted-foreground">{t('description')}</p>

              {isDevelopment && (
                <div className="text-left space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-1">{t('errorMessage')}</p>
                    <pre className="overflow-auto rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {errorDetails.message}
                    </pre>
                  </div>

                  {errorDetails.cause !== undefined && (
                    <div>
                      <p className="text-sm font-semibold mb-1">{t('causeDetails')}</p>
                      <pre className="overflow-auto rounded-md bg-yellow-500/10 p-3 text-sm">
                        {JSON.stringify(errorDetails.cause, null, 2)}
                      </pre>
                    </div>
                  )}

                  {errorDetails.digest && (
                    <div>
                      <p className="text-sm font-semibold mb-1">{t('errorDigest')}</p>
                      <pre className="overflow-auto rounded-md bg-primary/10 p-3 text-sm">{errorDetails.digest}</pre>
                    </div>
                  )}

                  {errorDetails.stack && (
                    <div>
                      <p className="text-sm font-semibold mb-1">{t('stackTrace')}</p>
                      <pre className="overflow-auto rounded-md bg-muted p-3 text-xs leading-5 max-h-48">
                        {errorDetails.stack}
                      </pre>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground bg-primary/5 p-3 rounded-md">{t('devNote')}</p>
                </div>
              )}

              {!isDevelopment && <p className="text-sm text-muted-foreground">{errorDetails.message}</p>}

              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  onClick={() => reset()}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t('tryAgain')}
                </button>
                <a
                  href={`/${locale}`}
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {t('goHome')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
