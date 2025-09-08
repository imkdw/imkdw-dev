'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button, Input } from '@imkdw-dev/ui';

export default function DesignSystemPage() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleLoadingToggle = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Design System</h1>
          <p className="text-muted mb-6">UI 컴포넌트 쇼케이스</p>
          
          {/* Theme Toggle Section */}
          <div className="flex flex-col items-center gap-4 p-6 border border-default rounded-lg bg-secondary max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-primary">테마 스위칭</h2>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted">
                현재 테마: <span className="font-medium text-primary capitalize">{resolvedTheme}</span>
              </div>
              <Button variant="primary" onClick={toggleTheme}>
                {resolvedTheme === 'dark' ? '🌞 라이트' : '🌙 다크'} 모드
              </Button>
            </div>
            <div className="text-xs text-muted text-center">
              <p>시스템 설정: <span className="font-medium">{theme}</span></p>
              <p>실제 적용: <span className="font-medium">{resolvedTheme}</span></p>
            </div>
            
            {/* Theme Options */}
            <div className="flex gap-2 mt-2">
              <Button
                variant={theme === 'light' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTheme('light')}
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTheme('dark')}
              >
                Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setTheme('system')}
              >
                System
              </Button>
            </div>
          </div>
        </div>

        {/* Button Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Button Components</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-secondary mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-secondary mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-secondary mb-3">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" loading={loading} onClick={handleLoadingToggle}>
                  {loading ? 'Loading...' : 'Click for Loading'}
                </Button>
                <Button variant="secondary" disabled>
                  Disabled Button
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Input Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="기본 입력"
                placeholder="텍스트를 입력하세요"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />

              <Input
                label="이메일 주소"
                type="email"
                placeholder="example@email.com"
                helperText="유효한 이메일 주소를 입력해주세요"
              />

              <Input label="비밀번호" type="password" placeholder="비밀번호 입력" />
            </div>

            <div className="space-y-4">
              <Input
                label="에러 상태"
                placeholder="잘못된 값"
                error={showError}
                errorMessage={showError ? '올바르지 않은 입력값입니다' : undefined}
              />

              <Input label="비활성화된 입력" placeholder="수정할 수 없습니다" disabled />

              <div className="pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowError(!showError)}>
                  에러 상태 토글
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Combined Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">실제 사용 예시</h2>

          <div className="max-w-md mx-auto p-6 border border-default rounded-lg bg-secondary">
            <h3 className="text-xl font-semibold text-primary mb-4">로그인</h3>
            <div className="space-y-4">
              <Input label="이메일" type="email" placeholder="이메일을 입력하세요" />
              <Input label="비밀번호" type="password" placeholder="비밀번호를 입력하세요" />
              <div className="flex gap-2">
                <Button variant="primary" className="flex-1">
                  로그인
                </Button>
                <Button variant="ghost">회원가입</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Theme Demo Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">테마별 색상 미리보기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Background Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-secondary">배경색</h3>
              <div className="bg-primary border border-default rounded p-3">
                <div className="text-xs text-primary">Primary BG</div>
              </div>
              <div className="bg-secondary border border-default rounded p-3">
                <div className="text-xs text-primary">Secondary BG</div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-secondary">텍스트 색상</h3>
              <div className="bg-primary border border-default rounded p-3 space-y-1">
                <div className="text-xs text-primary">Primary Text</div>
                <div className="text-xs text-secondary">Secondary Text</div>
                <div className="text-xs text-muted">Muted Text</div>
              </div>
            </div>

            {/* Border Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-secondary">테두리</h3>
              <div className="bg-primary border-2 border-default rounded p-3">
                <div className="text-xs text-primary">Default Border</div>
              </div>
              <div className="bg-primary border border-default rounded p-3">
                <div className="text-xs text-muted">Thin Border</div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-secondary">액센트</h3>
              <div className="bg-accent text-white rounded p-3">
                <div className="text-xs">Accent Color</div>
              </div>
              <div className="bg-destructive text-white rounded p-3">
                <div className="text-xs">Destructive</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-muted text-sm">
              위 버튼을 통해 실시간으로 테마를 전환해보세요. 시스템 테마 설정에 따라 자동으로 변경됩니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
