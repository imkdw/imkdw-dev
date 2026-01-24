# Tailwind Config 패키지

`@imkdw-dev/tailwind-config`는 모든 앱을 위한 공유 Tailwind CSS v4 설정을 제공합니다.

## 패키지 구조

```
src/
└── theme.css     # 단일 진입점 (CSS 변수, @theme 블록, custom utilities 모두 포함)
```

## 사용법

### 앱의 CSS 파일에서 import

```css
@import '@imkdw-dev/tailwind-config/theme.css';
```

### PostCSS 설정

Monorepo 환경에서 shared packages의 유틸리티 클래스를 감지하려면 `base` 옵션이 필수입니다:

```javascript
import path from 'path';

export default {
  plugins: {
    '@tailwindcss/postcss': {
      base: path.resolve(import.meta.dirname, '../../'),
    },
  },
};
```

`base` 옵션은 monorepo 루트 디렉토리를 가리킵니다.

## 디자인 토큰

### CSS 변수 (하이브리드 방식)

**의미론적 색상 (HSL)** - shadcn/ui 호환을 위해 HSL 형식 유지:
- `--background`, `--foreground`, `--card`, `--popover` 등
- `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- `--border`, `--input`, `--ring`

**커스텀 색상 (HEX)** - 가독성을 위해 HEX 형식 사용:
- Terminal: `--terminal-bg`, `--terminal-foreground`, `--terminal-accent` 등
- Code: `--code-bg`, `--code-keyword`, `--code-string` 등

### Light/Dark 모드

`:root` (라이트)와 `.dark` (다크)에서 정의:

```css
:root {
  /* HSL - shadcn/ui 호환 */
  --background: 220 14% 96%;
  --primary: 142 76% 32%;

  /* HEX - 커스텀 색상 */
  --terminal-bg: #f2f4f6;
  --code-keyword: #107189;
}

.dark {
  --background: 220 13% 18%;
  --terminal-bg: #282c33;
}
```

### Tailwind 테마

`@theme` 블록에서 색상 형식에 맞게 변환:

```css
@theme {
  /* HSL 변수는 hsl() 래퍼 사용 */
  --color-background: hsl(var(--background));
  --color-primary: hsl(var(--primary));

  /* HEX 변수는 직접 참조 */
  --color-terminal-bg: var(--terminal-bg);
  --color-code-keyword: var(--code-keyword);
}
```

## 커스텀 유틸리티

### Terminal 유틸리티
- `terminal-content`, `terminal-prompt` - 터미널 콘텐츠/프롬프트
- `prompt-symbol`, `prompt-path` - 프롬프트 기호/경로

### Syntax Highlighting
- `syntax-keyword`, `syntax-string`, `syntax-comment`
- `syntax-number`, `syntax-operator` - 구문 강조

### Animations
- `smooth-transition` - 부드러운 전환 효과

## 확장하기

### 의미론적 색상 추가 (HSL - shadcn 호환)

```css
/* theme.css */
/* @layer base 블록의 :root 섹션 */
:root {
  --my-semantic: 210 40% 50%;
}
.dark {
  --my-semantic: 210 40% 70%;
}

/* @theme 블록 */
--color-my-semantic: hsl(var(--my-semantic));
```

### 커스텀 색상 추가 (HEX - 디자이너 협업)

```css
/* theme.css */
/* @layer base 블록의 :root 섹션 */
:root {
  --my-custom: #3b82f6;
}
.dark {
  --my-custom: #60a5fa;
}

/* @theme 블록 */
--color-my-custom: var(--my-custom);
```

## 주요 특징

- **CSS-first**: Tailwind CSS v4의 새로운 CSS-first 설정 방식 사용
- **하이브리드 색상**: HSL (shadcn 호환) + HEX (디자이너 협업) 혼용
- **Dark Mode**: CSS 변수로 간단한 다크/라이트 모드 전환
- **Monorepo 최적화**: Shared packages 감지를 위한 `base` 옵션 제공
- **Theme Plugin**: `@tailwindcss/typography` 플러그인 포함
