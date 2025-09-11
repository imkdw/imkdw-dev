import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Label } from '@imkdw-dev/ui';
import { ThemeToggle } from './components/ThemeToggle';

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-lg text-muted-foreground">
            깔끔하고 실용적인 UI 컴포넌트 라이브러리
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Button Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Button</h2>
          <p className="text-muted-foreground">
            다양한 액션을 위한 버튼 컴포넌트
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">👍</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Card</h2>
          <p className="text-muted-foreground">
            콘텐츠를 그룹화하는 카드 컴포넌트
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                카드 설명이 들어가는 영역입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>카드 내용이 표시되는 영역입니다.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Action</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 상태</CardTitle>
              <CardDescription>
                현재 진행중인 작업 현황
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>진행률</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>설정</CardTitle>
              <CardDescription>
                애플리케이션 기본 설정
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="setting1">알림 설정</Label>
                <Input id="setting1" placeholder="설정값 입력" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Input Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Input</h2>
          <p className="text-muted-foreground">
            사용자 입력을 받는 인풋 컴포넌트
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="이메일을 입력하세요" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
            </div>
          </div>
          
          <div className="space-y-3">
            <Input placeholder="기본 인풋" />
            <Input placeholder="비활성화된 인풋" disabled />
          </div>
        </div>
      </section>

      {/* Badge Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Badge</h2>
          <p className="text-muted-foreground">
            상태나 카테고리를 표시하는 배지 컴포넌트
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">실제 사용 예시</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">프로젝트 A</CardTitle>
                    <Badge>활성</Badge>
                  </div>
                  <CardDescription>React 웹 애플리케이션</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">환경:</span>
                      <Badge variant="secondary">Production</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">프로젝트 B</CardTitle>
                    <Badge variant="destructive">오류</Badge>
                  </div>
                  <CardDescription>Node.js API 서버</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">환경:</span>
                      <Badge variant="outline">Staging</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tokens */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Design Tokens</h2>
          <p className="text-muted-foreground">
            디자인 시스템의 기본 토큰들
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 bg-primary rounded border"></div>
            <p className="text-sm font-medium">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-secondary rounded border"></div>
            <p className="text-sm font-medium">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-destructive rounded border"></div>
            <p className="text-sm font-medium">Destructive</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 bg-muted rounded border"></div>
            <p className="text-sm font-medium">Muted</p>
          </div>
        </div>
      </section>
    </div>
  );
}