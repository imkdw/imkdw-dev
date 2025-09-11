import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge } from '@imkdw-dev/ui';
import { ThemeToggle } from './components/ThemeToggle';

export default function DesignSystemPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Design System</h1>
          <p className="text-muted-foreground">UI 컴포넌트 라이브러리 쇼케이스</p>
        </div>
        <ThemeToggle />
      </div>

      {/* Button Components Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Button 컴포넌트</h2>
          <p className="text-muted-foreground mb-6">
            다양한 variant와 크기를 지원하는 버튼 컴포넌트입니다.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="terminal">Terminal</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
            <Button size="icon">🎨</Button>
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Combined Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Combined Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Primary Actions</h4>
              <div className="space-y-2">
                <Button className="w-full" variant="primary">저장하기</Button>
                <Button className="w-full" variant="primary" loading>처리중...</Button>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Secondary Actions</h4>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">취소</Button>
                <Button className="w-full" variant="ghost">건너뛰기</Button>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Terminal Style</h4>
              <div className="space-y-2">
                <Button className="w-full" variant="terminal" size="sm">$ npm install</Button>
                <Button className="w-full" variant="terminal" size="sm">$ git commit -m</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Input Components Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Input 컴포넌트</h2>
          <p className="text-muted-foreground mb-6">
            다양한 variant와 크기, 상태를 지원하는 입력 컴포넌트입니다.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Default</h4>
              <Input placeholder="Enter your text..." />
              <Input label="Email" placeholder="user@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Terminal</h4>
              <Input variant="terminal" placeholder="$ command input" />
              <Input variant="terminal" label="Username" placeholder="root@localhost" />
              <Input variant="terminal" label="Directory" placeholder="/home/user" />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Sizes</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm text-foreground">Small (sm)</label>
              <Input size="sm" placeholder="Small input" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground">Medium (md) - Default</label>
              <Input size="md" placeholder="Medium input" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground">Large (lg)</label>
              <Input size="lg" placeholder="Large input" />
            </div>
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">States</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="space-y-2">
                <Input label="Normal State" placeholder="Normal input" helperText="This is a helper text" />
              </div>
              <div className="space-y-2">
                <Input label="Error State" placeholder="Error input" errorMessage="This field is required" />
              </div>
              <div className="space-y-2">
                <Input label="Success State" placeholder="Success input" successMessage="Valid input!" />
              </div>
              <div className="space-y-2">
                <Input label="Disabled State" placeholder="Disabled input" disabled />
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <Input variant="terminal" label="Terminal Normal" placeholder="$ normal" helperText="Terminal helper text" />
              </div>
              <div className="space-y-2">
                <Input variant="terminal" label="Terminal Error" placeholder="$ error" errorMessage="Command not found" />
              </div>
              <div className="space-y-2">
                <Input variant="terminal" label="Terminal Success" placeholder="$ success" successMessage="Command executed successfully" />
              </div>
              <div className="space-y-2">
                <Input variant="terminal" label="Terminal Disabled" placeholder="$ disabled" disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Combined Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Combined Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">User Registration</h4>
              <div className="space-y-3">
                <Input label="Full Name" placeholder="John Doe" />
                <Input label="Email" type="email" placeholder="john@example.com" />
                <Input label="Password" type="password" placeholder="••••••••" />
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Search & Filter</h4>
              <div className="space-y-3">
                <Input size="sm" placeholder="Search..." />
                <Input size="sm" placeholder="Filter by category" />
                <Input size="sm" type="number" placeholder="Min price" />
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Terminal Commands</h4>
              <div className="space-y-3">
                <Input variant="terminal" size="sm" placeholder="$ npm install" />
                <Input variant="terminal" size="sm" placeholder="$ git commit -m" />
                <Input variant="terminal" size="sm" placeholder="$ docker run" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Components Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Card 컴포넌트</h2>
          <p className="text-muted-foreground mb-6">
            헤더/바디/푸터 구조와 그라데이션을 지원하는 카드 컴포넌트입니다.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>기본 카드 스타일입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  기본 배경과 그림자를 사용하는 표준 카드입니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">액션</Button>
              </CardFooter>
            </Card>

            <Card variant="gradient">
              <CardHeader>
                <CardTitle>Gradient Card</CardTitle>
                <CardDescription>그라데이션 배경 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  미묘한 그라데이션 효과를 가진 카드입니다.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">액션</Button>
              </CardFooter>
            </Card>

            <Card variant="terminal">
              <CardHeader>
                <CardTitle variant="terminal">Terminal Card</CardTitle>
                <CardDescription variant="terminal">터미널 스타일 카드입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-terminal-foreground/70 font-mono">
                  $ ls -la /usr/local/bin
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="terminal">실행</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card size="sm">
              <CardHeader size="sm">
                <CardTitle size="sm">Small Card</CardTitle>
                <CardDescription size="sm">작은 크기 카드</CardDescription>
              </CardHeader>
              <CardContent size="sm">
                <p className="text-xs text-muted-foreground">컴팩트한 레이아웃</p>
              </CardContent>
              <CardFooter size="sm">
                <Button size="xs">액션</Button>
              </CardFooter>
            </Card>

            <Card size="md">
              <CardHeader size="md">
                <CardTitle size="md">Medium Card</CardTitle>
                <CardDescription size="md">중간 크기 카드 (기본값)</CardDescription>
              </CardHeader>
              <CardContent size="md">
                <p className="text-sm text-muted-foreground">표준 레이아웃</p>
              </CardContent>
              <CardFooter size="md">
                <Button size="sm">액션</Button>
              </CardFooter>
            </Card>

            <Card size="lg">
              <CardHeader size="lg">
                <CardTitle size="lg">Large Card</CardTitle>
                <CardDescription size="lg">큰 크기 카드</CardDescription>
              </CardHeader>
              <CardContent size="lg">
                <p className="text-base text-muted-foreground">넓은 레이아웃</p>
              </CardContent>
              <CardFooter size="lg">
                <Button size="md">액션</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Shadow Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Shadow Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card shadow="none">
              <CardHeader>
                <CardTitle>No Shadow</CardTitle>
                <CardDescription>그림자 없음</CardDescription>
              </CardHeader>
            </Card>

            <Card shadow="sm">
              <CardHeader>
                <CardTitle>Small Shadow</CardTitle>
                <CardDescription>작은 그림자</CardDescription>
              </CardHeader>
            </Card>

            <Card shadow="md">
              <CardHeader>
                <CardTitle>Medium Shadow</CardTitle>
                <CardDescription>중간 그림자</CardDescription>
              </CardHeader>
            </Card>

            <Card shadow="lg">
              <CardHeader>
                <CardTitle>Large Shadow</CardTitle>
                <CardDescription>큰 그림자</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Combined Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Combined Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default" size="md" shadow="md">
              <CardHeader>
                <CardTitle>사용자 프로필</CardTitle>
                <CardDescription>사용자 정보를 관리합니다</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input label="이름" placeholder="홍길동" />
                  <Input label="이메일" type="email" placeholder="hong@example.com" />
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button variant="outline" size="sm">취소</Button>
                <Button size="sm">저장</Button>
              </CardFooter>
            </Card>

            <Card variant="gradient" size="md" shadow="lg">
              <CardHeader>
                <CardTitle>프로젝트 상태</CardTitle>
                <CardDescription>현재 진행 중인 작업</CardDescription>
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
                  <p className="text-xs text-muted-foreground">3개 작업 완료, 1개 남음</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">상세 보기</Button>
              </CardFooter>
            </Card>

            <Card variant="terminal" size="md" shadow="md">
              <CardHeader>
                <CardTitle variant="terminal">시스템 정보</CardTitle>
                <CardDescription variant="terminal">서버 상태 모니터링</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 font-mono text-xs text-terminal-foreground/80">
                  <div>$ uptime</div>
                  <div>up 15 days, 4:23</div>
                  <div>$ df -h</div>
                  <div>Filesystem: 85% used</div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="terminal" size="xs">새로고침</Button>
                <Button variant="terminal" size="xs">로그 보기</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Badge Components Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Badge 컴포넌트</h2>
          <p className="text-muted-foreground mb-6">
            상태별 색상과 크기를 지원하는 배지 컴포넌트입니다.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="terminal">Terminal</Badge>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge size="xs">Extra Small</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>

        {/* Shapes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Shapes</h3>
          <div className="flex flex-wrap gap-3">
            <Badge shape="pill">Pill Shape</Badge>
            <Badge shape="rounded">Rounded Shape</Badge>
          </div>
        </div>

        {/* State Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">State Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Success States</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">완료</Badge>
                <Badge variant="success" size="sm">승인됨</Badge>
                <Badge variant="success" size="xs">활성</Badge>
              </div>
            </div>
            
            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Warning States</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="warning">대기중</Badge>
                <Badge variant="warning" size="sm">검토 필요</Badge>
                <Badge variant="warning" size="xs">주의</Badge>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Error States</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="destructive">실패</Badge>
                <Badge variant="destructive" size="sm">오류</Badge>
                <Badge variant="destructive" size="xs">차단됨</Badge>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg space-y-3">
              <h4 className="font-medium text-foreground">Info States</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">정보</Badge>
                <Badge variant="info" size="sm">베타</Badge>
                <Badge variant="info" size="xs">새로움</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Examples */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Combined Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle size="sm">프로젝트 A</CardTitle>
                  <Badge variant="success" size="sm">활성</Badge>
                </div>
                <CardDescription>React 기반 웹 애플리케이션</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">상태:</span>
                    <Badge variant="success" size="xs">배포됨</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">환경:</span>
                    <Badge variant="info" size="xs">Production</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle size="sm">프로젝트 B</CardTitle>
                  <Badge variant="warning" size="sm">대기중</Badge>
                </div>
                <CardDescription>Node.js API 서버</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">상태:</span>
                    <Badge variant="warning" size="xs">검토중</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">환경:</span>
                    <Badge variant="secondary" size="xs">Staging</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="terminal">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle variant="terminal" size="sm">시스템 상태</CardTitle>
                  <Badge variant="terminal" size="sm">모니터링</Badge>
                </div>
                <CardDescription variant="terminal">서버 상태 체크</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-foreground/70">CPU:</span>
                    <Badge variant="success" size="xs" shape="rounded">정상</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-foreground/70">Memory:</span>
                    <Badge variant="warning" size="xs" shape="rounded">75%</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-terminal-foreground/70">Network:</span>
                    <Badge variant="success" size="xs" shape="rounded">연결됨</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Tokens Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Design Tokens</h2>
          <p className="text-muted-foreground mb-6">
            디자인 시스템에서 사용되는 색상, 타이포그래피, 간격 등의 토큰입니다.
          </p>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-primary rounded border"></div>
              <p className="text-sm text-foreground font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary rounded border"></div>
              <p className="text-sm text-foreground font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-destructive rounded border"></div>
              <p className="text-sm text-foreground font-medium">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-terminal-bg rounded border"></div>
              <p className="text-sm text-foreground font-medium">Terminal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Phase 5 완료: Badge 컴포넌트 (CVA 패턴, 상태별 색상, 크기 variants, 터미널 테마)
        </p>
      </footer>
    </div>
  );
}