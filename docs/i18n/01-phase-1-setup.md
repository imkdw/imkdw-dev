# Phase 1: 기반 설정

## 개요

next-intl 패키지 설치 및 기본 설정 파일 생성

- **예상 소요**: 0.5일
- **선행 조건**: 없음
- **커밋 단위**: 3개

---

## Task 1.1: next-intl 패키지 설치

### 작업 내용

- next-intl 패키지 설치

### 명령어

```bash
pnpm add next-intl --filter @imkdw-dev/blog
```

### 확인 사항

- [x] `apps/blog/package.json`에 next-intl 추가됨
- [x] `pnpm install` 정상 완료

### 커밋

```
feat(blog): add next-intl package for i18n support
```

---

## Task 1.2: i18n 설정 파일 생성

### 작업 내용

- `src/i18n/routing.ts` 생성
- `src/i18n/request.ts` 생성
- `src/i18n/navigation.ts` 생성

### 파일 생성

#### `apps/blog/src/i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
```

#### `apps/blog/src/i18n/request.ts`

```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Asia/Seoul',
  };
});
```

#### `apps/blog/src/i18n/navigation.ts`

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

### 확인 사항

- [x] `src/i18n/routing.ts` 생성됨
- [x] `src/i18n/request.ts` 생성됨
- [x] `src/i18n/navigation.ts` 생성됨
- [x] TypeScript 에러 없음

### 커밋

```
feat(blog): add i18n configuration files

- routing.ts: define supported locales (ko, en)
- request.ts: configure request-level i18n settings
- navigation.ts: export i18n-aware navigation utilities
```

---

## Task 1.3: 메시지 파일 및 next.config 설정

### 작업 내용

- `messages/ko.json` 생성 (초기 구조)
- `messages/en.json` 생성 (초기 구조)
- `next.config.ts` 수정
- `proxy.ts` (middleware) 생성

### 파일 생성/수정

#### `apps/blog/messages/ko.json`

```json
{
  "metadata": {
    "siteTitle": "@imkdw-dev/blog",
    "siteDescription": "직접 개발하고 운영하는 IT 기술블로그"
  }
}
```

#### `apps/blog/messages/en.json`

```json
{
  "metadata": {
    "siteTitle": "@imkdw-dev/blog",
    "siteDescription": "A tech blog I develop and operate myself"
  }
}
```

#### `apps/blog/proxy.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|terminal|feed\\.xml|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
};
```

#### `apps/blog/next.config.ts` (수정)

```typescript
import path from 'path';
import dotenv from 'dotenv';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
  experimental: {
    authInterrupts: true,
  },
};

export default withNextIntl(nextConfig);
```

### 확인 사항

- [x] `messages/ko.json` 생성됨
- [x] `messages/en.json` 생성됨
- [x] `proxy.ts` 생성됨
- [x] `next.config.ts` 수정됨
- [x] `pnpm build` 에러 없음 (아직 라우팅 변경 전이라 warning 있을 수 있음)

### 커밋

```
feat(blog): add i18n messages and middleware configuration

- Add initial message files (ko.json, en.json)
- Add proxy.ts middleware for locale routing
- Update next.config.ts with next-intl plugin
```

---

## Phase 1 완료 체크리스트

- [x] Task 1.1 완료 및 커밋
- [x] Task 1.2 완료 및 커밋
- [x] Task 1.3 완료 및 커밋
- [x] 전체 빌드 테스트 (`pnpm build`)

## Task 1.4: 공통 i18n 패키지로 리팩토링

### 작업 내용

- `packages/i18n` 패키지 생성
- 공통 i18n 로직 추출 (타입, 유틸리티)
- 앱에서 공통 패키지 사용하도록 수정

### 파일 생성/수정

#### `packages/i18n/package.json`

```json
{
  "name": "@imkdw-dev/i18n",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "next-intl": "workspace:^"
  },
  "devDependencies": {
    "@imkdw-dev/typescript-config": "workspace:*",
    "typescript": "^5.9.2"
  }
}
```

#### `packages/i18n/tsconfig.json`

```json
{
  "extends": "@imkdw-dev/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

#### `packages/i18n/src/types.ts`

```typescript
export type Locale = 'ko' | 'en';
export type MessageKey = string;
```

#### `packages/i18n/src/utils.ts`

```typescript
import type { Locale } from './types';

export function getLocalizedPath(pathname: string, locale: Locale): string {
  // Remove existing locale prefix if any
  const withoutLocale = pathname.replace(/^\/(ko|en)/, '');
  return `/${locale}${withoutLocale}`;
}

export function extractLocale(pathname: string): Locale {
  const match = pathname.match(/^\/(ko|en)/);
  return match ? (match[1] as Locale) : 'ko';
}
```

#### `packages/i18n/src/index.ts`

```typescript
export * from './types';
export * from './utils';
```

#### `apps/blog/src/i18n/routing.ts` (수정)

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
```

#### `apps/blog/src/i18n/request.ts` (수정 - 패키지 사용)

```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import type { Locale } from '@imkdw-dev/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Asia/Seoul',
  };
});

export type { Locale };
```

### 확인 사항

- [ ] `packages/i18n` 패키지 생성됨
- [ ] 공통 타입 및 유틸리티 추출됨
- [ ] `apps/blog/package.json`에 `@imkdw-dev/i18n` 의존성 추가됨
- [ ] `apps/blog/src/i18n/request.ts`에서 공통 패키지 사용
- [ ] `pnpm build` 에러 없음

### 커밋

```
refactor(blog): extract common i18n logic to shared package

- Create @imkdw-dev/i18n package for common i18n utilities
- Move Locale type and helper functions to shared package
- Update blog app to use @imkdw-dev/i18n
```

---

## Phase 1 완료 체크리스트

- [x] Task 1.1 완료 및 커밋
- [x] Task 1.2 완료 및 커밋
- [x] Task 1.3 완료 및 커밋
- [x] Task 1.4 완료 및 커밋
- [x] 전체 빌드 테스트 (`pnpm build`)

## 다음 Phase

Phase 1 완료 후 [Phase 2: 라우팅 구조 변경](./02-phase-2-routing.md)으로 진행
