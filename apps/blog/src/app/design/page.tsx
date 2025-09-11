import { Button, Input } from '@imkdw-dev/ui';
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
          Phase 3 완료: Input 컴포넌트 (CVA 패턴, 터미널 테마, 다양한 크기 및 상태)
        </p>
      </footer>
    </div>
  );
}