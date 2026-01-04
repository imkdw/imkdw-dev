import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('errors.notFound');

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
              <Button asChild>
                <Link href="/">{t('goHome')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/articles">{t('viewArticles')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
