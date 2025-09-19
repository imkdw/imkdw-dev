import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';

export default function Unauthorized() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">
              401 - 인증 필요
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              이 페이지에 접근하려면 로그인이 필요합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild>
                <Link href="/login">
                  로그인
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  홈으로 돌아가기
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}