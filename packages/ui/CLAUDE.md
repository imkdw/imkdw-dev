# UI 패키지 가이드

`@imkdw-dev/ui`는 imkdw-dev 블로그를 위한 디자인 시스템 패키지입니다. React 19+와 TypeScript를 기반으로 한 재사용 가능한 UI 컴포넌트들을 제공합니다.

## 패키지 개요

### 기본 정보
- **패키지명**: `@imkdw-dev/ui`
- **버전**: 0.1.0
- **설명**: Design system for imkdw-dev blog
- **메인 진입점**: `./src/index.ts`
- **Tailwind Preset**: `./src/tokens/tailwind-preset.ts`

### 주요 특징
- **Headless UI & Radix UI 기반**: 접근성과 사용성을 고려한 컴포넌트
- **Tailwind CSS v3 고정 버전**: 안정성을 위한 버전 고정
- **Terminal/Code 테마**: 개발 블로그 특성에 맞는 터미널과 코드 하이라이팅 테마
- **다크/라이트 모드**: CSS 변수 기반 완전한 테마 시스템
- **TypeScript 완전 지원**: 모든 컴포넌트에 타입 정의 포함

## 디렉토리 구조

```
src/
├── components/          # 복합 컴포넌트 (비즈니스 로직 포함)
│   ├── auth/           # 인증 관련 컴포넌트 (login-modal, user-menu)
│   ├── cards/          # 카드 컴포넌트들 (article-card, series-card)
│   ├── layout/         # 레이아웃 컴포넌트 (header, footer, sidebar)
│   ├── notifications/  # 알림 시스템
│   └── terminal/       # 터미널 관련 컴포넌트
├── primitives/         # 기본 UI 컴포넌트 (재사용 가능한 기본 요소)
│   ├── badge/          # 뱃지 컴포넌트
│   ├── button/         # 버튼 컴포넌트 (variants 포함)
│   ├── card/           # 기본 카드 컴포넌트
│   ├── input/          # 입력 필드 컴포넌트
│   ├── label/          # 레이블 컴포넌트
│   └── ...             # 기타 primitive 컴포넌트들
├── lib/                # 유틸리티 함수
│   └── utils.ts        # cn 함수 (clsx + tailwind-merge)
├── styles/             # CSS 파일
│   ├── globals.css     # 전역 스타일
│   └── terminal.css    # 터미널 전용 스타일
├── tokens/             # 디자인 토큰
│   ├── colors.ts       # 색상 시스템 정의
│   └── tailwind-preset.ts  # Tailwind 커스텀 프리셋
└── index.ts            # 패키지 메인 진입점
```

## 개발 가이드라인

### 컴포넌트 작성 규칙

1. **Props 인터페이스 명명**
```typescript
// ✅ 올바른 방법
interface Props {
  // 컴포넌트 props 정의
}

export function Component({ ...props }: Props) {
  // 컴포넌트 구현
}
```

2. **Export 패턴**
```typescript
// 각 컴포넌트 폴더의 index.ts
export * from "./component-name";
```

3. **디렉토리 구조**
   - **primitives/**: 재사용 가능한 기본 UI 요소
   - **components/**: 비즈니스 로직이 포함된 복합 컴포넌트
   - 각 컴포넌트는 폴더로 분리하고 `index.ts`로 export

### Tailwind CSS 사용법

1. **클래스 결합**: `cn()` 유틸리티 함수 사용
```typescript
import { cn } from '@imkdw-dev/ui/lib';

<div className={cn('base-classes', conditionalClasses, className)} />
```

### 컴포넌트 작성방법(function 키워드 활용)
```typescript
export function Component({ ...props }: Props) {
  return (
    <div className={cn('base-classes', conditionalClasses, className)}>
      {children}
    </div>
  );
}
```


2. **CSS 변수 활용**: 테마 시스템 기반 색상 사용
```css
background: hsl(var(--background));
color: hsl(var(--foreground));
```

## 주요 기능

### Tailwind Preset 사용법

```typescript
// tailwind.config.ts
import tailwindPreset from '@imkdw-dev/ui/tailwind-preset';

export default {
  presets: [tailwindPreset],
  content: [
    // 콘텐츠 경로들
  ],
};
```

### 테마 시스템

#### 다크/라이트 모드
- CSS 변수 기반 테마 자동 전환
- `.dark` 클래스로 다크 모드 활성화

#### 특화 테마
- **Terminal 테마**: 터미널 UI를 위한 전용 색상
- **Code 테마**: 코드 하이라이팅을 위한 문법 색상
- **Sidebar 테마**: 사이드바 전용 색상 시스템

### 애니메이션 시스템

```css
/* 사용 가능한 애니메이션 */
.fade-in      /* 페이드인 효과 */
.slide-up     /* 아래에서 위로 슬라이드 */
.scale-in     /* 스케일 인 효과 */
.shimmer      /* 로딩 shimmer 효과 */
.float        /* 떠다니는 효과 */
.terminal-blink  /* 터미널 커서 깜빡임 */
```

### 유틸리티 클래스

```css
/* 터미널 스타일 */
.terminal-window    /* 터미널 창 스타일 */
.terminal-header    /* 터미널 헤더 */
.terminal-content   /* 터미널 내용 */

/* 문법 하이라이팅 */
.syntax-keyword    /* 키워드 색상 */
.syntax-string     /* 문자열 색상 */
.syntax-comment    /* 주석 색상 */
.syntax-number     /* 숫자 색상 */
.syntax-operator   /* 연산자 색상 */
```

## 사용법 예시

### 컴포넌트 Import

```typescript
// 개별 컴포넌트 import
import { Button, Card, Badge } from '@imkdw-dev/ui';

// 유틸리티 함수 import
import { cn } from '@imkdw-dev/ui/lib';
```

### 기본 사용법

```typescript
import { Button, Card, Badge } from '@imkdw-dev/ui';

function Example() {
  return (
    <Card>
      <div className="p-6">
        <Badge variant="secondary">New</Badge>
        <h2>Card Title</h2>
        <Button variant="primary" size="md">
          Click Me
        </Button>
      </div>
    </Card>
  );
}
```

### 커스텀 스타일링

```typescript
import { Button, cn } from '@imkdw-dev/ui';

function CustomButton({ className, ...props }) {
  return (
    <Button
      className={cn(
        'custom-styles', // 커스텀 스타일 추가
        'hover:custom-hover', // 호버 효과 추가
        className // 외부에서 전달된 클래스
      )}
      {...props}
    />
  );
}
```

## 의존성

### Peer Dependencies (필수)
- React >= 18.0.0
- React DOM >= 18.0.0

### Main Dependencies
- **@headlessui/react**: 접근성 중심 UI 컴포넌트
- **tailwindcss**: v3 고정 (안정성)
- **class-variance-authority**: 컴포넌트 variant 관리
- **clsx**: 조건부 클래스 결합
- **tailwind-merge**: Tailwind 클래스 충돌 해결
- **lucide-react**: 아이콘 라이브러리

## 개발 명령어

```bash
# 타입 체크
pnpm ui check-types

# ESLint 검사
pnpm ui lint

# 개발 모드 (정적 출력)
pnpm ui dev
```

## 주의사항

1. **Tailwind CSS v3 고정**: 호환성을 위해 v3으로 고정되어 있습니다
2. **Props 인터페이스**: 모든 컴포넌트의 Props는 `interface Props`로 명명
3. **Export 패턴**: `export * from "./file"` 패턴을 일관되게 사용
4. **CSS 변수 의존성**: 테마 시스템이 CSS 변수에 의존하므로 글로벌 스타일 필수
5. **빌드 순서**: 다른 앱에서 사용하기 전에 UI 패키지를 먼저 빌드해야 합니다

## 확장 가이드

### 새 컴포넌트 추가

1. **Primitive 컴포넌트**: `src/primitives/` 하위에 폴더 생성
2. **Complex 컴포넌트**: `src/components/` 하위에 기능별 폴더 생성
3. 각 폴더에 `index.ts` 파일로 export 정의
4. 상위 `index.ts`에서 `export *` 추가

### 테마 확장

1. `src/tokens/colors.ts`에서 새 색상 정의
2. `src/tokens/tailwind-preset.ts`에서 CSS 변수 추가
3. 필요시 커스텀 유틸리티 클래스 추가