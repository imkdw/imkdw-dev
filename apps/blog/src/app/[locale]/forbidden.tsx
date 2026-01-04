import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';

export default function Forbidden() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">403 - 접근 금지</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">이 페이지에 접근할 권한이 없습니다.</p>
            <p className="text-sm text-muted-foreground">관리자에게 문의하시거나 다른 페이지를 이용해 주세요.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">홈으로 돌아가기</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
