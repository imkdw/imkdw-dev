import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">404 - 페이지를 찾을 수 없습니다</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild>
                <Link href="/">홈으로 돌아가기</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/posts">게시글 목록</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
