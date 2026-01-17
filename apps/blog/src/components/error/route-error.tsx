'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  namespace: 'errors.article' | 'errors.series';
}

export function RouteError({ error, reset, namespace }: RouteErrorProps) {
  const t = useTranslations(namespace);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-destructive">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{t('description')}</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={reset}>{t('tryAgain')}</Button>
            <Button variant="outline" asChild>
              <Link href="/">{t('goHome')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
