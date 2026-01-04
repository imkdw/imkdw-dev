# Phase 2: 라우팅 구조 변경

## 개요

기존 app/ 구조를 app/[locale]/ 구조로 변경

- **예상 소요**: 0.5일
- **선행 조건**: Phase 1 완료
- **커밋 단위**: 2개

---

## Task 2.1: [locale] 디렉토리 구조 생성 및 파일 이동

### 작업 내용

- `app/[locale]/` 디렉토리 생성
- 기존 페이지 파일들을 `[locale]/` 하위로 이동
- **터미널, API 라우트는 제외**

### 이동할 파일 목록

```
# 이동 대상 (app/ → app/[locale]/)
app/page.tsx                      → app/[locale]/page.tsx
app/not-found.tsx                 → app/[locale]/not-found.tsx
app/forbidden.tsx                 → app/[locale]/forbidden.tsx
app/unauthorized.tsx              → app/[locale]/unauthorized.tsx
app/global-error.tsx              → app/[locale]/global-error.tsx
app/design/                       → app/[locale]/design/
app/articles/                     → app/[locale]/articles/
app/series/                       → app/[locale]/series/
app/members/                      → app/[locale]/members/

# 이동하지 않음 (locale 밖에 유지)
app/layout.tsx                    # 루트 레이아웃 (별도 처리)
app/terminal/                     # 한국어 전용
app/api/                          # API 라우트
app/feed.xml/                     # RSS 피드
```

### 명령어

```bash
cd apps/blog/src

# [locale] 디렉토리 생성
mkdir -p "app/[locale]"

# 페이지 파일 이동
mv app/page.tsx "app/[locale]/"
mv app/not-found.tsx "app/[locale]/"
mv app/forbidden.tsx "app/[locale]/"
mv app/unauthorized.tsx "app/[locale]/"
mv app/global-error.tsx "app/[locale]/"

# 디렉토리 이동
mv app/design "app/[locale]/"
mv app/articles "app/[locale]/"
mv app/series "app/[locale]/"
mv app/members "app/[locale]/"
```

### 확인 사항

- [ ] `app/[locale]/` 디렉토리 생성됨
- [ ] 모든 페이지 파일 이동 완료
- [ ] `app/terminal/` 은 그대로 유지됨
- [ ] `app/api/` 는 그대로 유지됨

### 커밋

```
refactor(blog): move pages to [locale] directory for i18n routing

- Move all pages to app/[locale]/ structure
- Keep terminal/ and api/ outside locale routing
```

---

## Task 2.2: 레이아웃 분리 및 locale 레이아웃 생성

### 작업 내용

- 기존 `app/layout.tsx`를 루트 레이아웃으로 최소화
- `app/[locale]/layout.tsx` 생성 (locale별 레이아웃)

### 파일 수정/생성

#### `apps/blog/src/app/layout.tsx` (루트 - 최소화)

```tsx
import { pretendard, jetBrainsMono } from '@imkdw-dev/fonts';

import '@imkdw-dev/ui/globals.css';
import '@imkdw-dev/ui/milkdown.css';
import '@imkdw-dev/ui/image-zoom.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning style={{ '--font-code': jetBrainsMono.style.fontFamily } as React.CSSProperties}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
```

#### `apps/blog/src/app/[locale]/layout.tsx` (신규 생성)

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import { Providers } from '../../components/providers';
import { MobileSidebar } from '../../components/sidebar/mobile-sidebar';
import { NavigationProgress } from '../../components/navigation-progress';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_ENV } from '@imkdw-dev/consts';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('siteTitle'),
    description: t('siteDescription'),
    alternates: {
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <NavigationProgress />
        {children}
        <MobileSidebar />
      </Providers>
      {process.env.APP_ENV === APP_ENV.PRODUCTION && <GoogleAnalytics gaId="G-DXRR1KZDDN" />}
    </NextIntlClientProvider>
  );
}
```

### 확인 사항

- [ ] `app/layout.tsx` 최소화됨 (html, body 태그만)
- [ ] `app/[locale]/layout.tsx` 생성됨
- [ ] NextIntlClientProvider 적용됨
- [ ] generateStaticParams 추가됨
- [ ] generateMetadata에서 번역 사용
- [ ] 기존 Providers, MobileSidebar 등 유지됨

### 커밋

```
feat(blog): add locale-aware layout with NextIntlClientProvider

- Minimize root layout to html/body shell
- Create [locale]/layout.tsx with i18n provider
- Add generateStaticParams for static generation
- Use translated metadata
```

---

## Phase 2 완료 체크리스트

- [ ] Task 2.1 완료 및 커밋
- [ ] Task 2.2 완료 및 커밋
- [ ] `pnpm dev` 실행 후 `/ko`, `/en` 접속 테스트
- [ ] 터미널 페이지 (`/terminal`) 정상 접속 확인
- [ ] 전체 빌드 테스트 (`pnpm build`)

## 예상 이슈 및 해결

### 이슈 1: Link 컴포넌트 경로 문제

기존 `next/link`의 `href="/articles"`가 locale prefix 없이 동작할 수 있음.

**해결**: Phase 3에서 `@/i18n/navigation`의 Link로 점진적 교체

### 이슈 2: 리다이렉트 동작

루트 `/` 접속 시 `/ko`로 자동 리다이렉트되어야 함.

**확인**: middleware(proxy.ts)가 정상 동작하는지 테스트

## 다음 Phase

Phase 2 완료 후 [Phase 3: 레이아웃 & 네비게이션](./03-phase-3-layout.md)으로 진행
