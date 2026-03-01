import Link from 'next/link';
import { Image } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@imkdw-dev/ui';

const categories = [
  {
    name: 'IMAGE',
    href: '/image',
    icon: Image,
    description: '이미지 관련 유틸들',
    toolCount: 1,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
        <p className="text-sm text-muted-foreground">개발에 필요한 유틸리티 도구 모음</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="h-full border border-border transition-all hover:border-primary hover:shadow-md">
              <CardHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <CardDescription className="text-xs">{category.description}</CardDescription>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{category.toolCount}개 도구</span>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
