import Link from 'next/link';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { Layout } from '@/components/layout';
import { getTranslations } from 'next-intl/server';

export default async function Unauthorized() {
  const t = await getTranslations('errors.unauthorized');

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">{t('goHome')}</Link>
              </Button>
              <Button asChild>
                <Link href="/login">{t('login')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
