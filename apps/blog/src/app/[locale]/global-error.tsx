'use client';

import { useTranslations } from 'next-intl';

const isDevelopment = process.env.NODE_ENV === 'development';

type Locale = 'ko' | 'en';

function getLocaleFromPath(): Locale {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const localeMatch = pathname.match(/^\/(ko|en)/);
    if (localeMatch) {
      return localeMatch[1] as Locale;
    }
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ko')) {
      return 'ko';
    }
  }
  return 'en';
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
      <body className="mx-auto max-w-3xl p-10 font-sans">
        <div className="mb-5">
          <h1 className="mb-2.5 text-red-600">{t('title')}</h1>
          <p className="mb-5 text-lg text-gray-700">{t('description')}</p>
        </div>

        {isDevelopment && (
          <div className="mb-8">
            <div className="mb-5">
              <h2 className="mb-2 text-base font-bold">{t('errorMessage')}</h2>
              <pre className="overflow-auto rounded-md bg-red-100 p-3 text-sm">{errorDetails.message}</pre>
            </div>

            {errorDetails.cause !== undefined && (
              <div className="mb-5">
                <h2 className="mb-2 text-base font-bold">{t('causeDetails')}</h2>
                <pre className="overflow-auto rounded-md bg-yellow-100 p-3 text-sm">
                  {JSON.stringify(errorDetails.cause, null, 2)}
                </pre>
              </div>
            )}

            {errorDetails.digest && (
              <div className="mb-5">
                <h2 className="mb-2 text-base font-bold">{t('errorDigest')}</h2>
                <pre className="overflow-auto rounded-md bg-indigo-100 p-3 text-sm">{errorDetails.digest}</pre>
              </div>
            )}

            {errorDetails.stack && (
              <div className="mb-5">
                <h2 className="mb-2 text-base font-bold">{t('stackTrace')}</h2>
                <pre className="overflow-auto rounded-md bg-gray-100 p-3 text-xs leading-6">{errorDetails.stack}</pre>
              </div>
            )}

            <div className="rounded-md bg-blue-100 p-3 text-sm text-blue-800">{t('devNote')}</div>
          </div>
        )}

        {!isDevelopment && (
          <div className="mb-8">
            <p className="text-gray-500">{errorDetails.message}</p>
          </div>
        )}

        <button
          onClick={() => reset()}
          className="cursor-pointer rounded-md border-none bg-blue-500 px-6 py-3 text-base font-medium text-white"
        >
          {t('tryAgain')}
        </button>
      </body>
    </html>
  );
}
