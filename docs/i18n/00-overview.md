# i18n 구현 계획 - 개요

## 프로젝트 정보

- **프로젝트**: @imkdw-dev/blog
- **프레임워크**: Next.js 16 (App Router)
- **i18n 라이브러리**: next-intl
- **작성일**: 2026-01-04

---

## 결정 사항

| 항목             | 결정                                                  |
| ---------------- | ----------------------------------------------------- |
| 지원 언어        | 한국어(ko), 영어(en)                                  |
| 기본 언어        | 한국어(ko)                                            |
| URL 구조         | `/ko/articles`, `/en/articles` (locale prefix always) |
| packages/ui 처리 | props로 텍스트 전달 (언어 중립 유지)                  |
| 터미널 페이지    | 제외 (한국어 전용 유지, locale 라우팅 밖)             |

---

## 최종 디렉토리 구조

```
apps/blog/
├── messages/
│   ├── ko.json
│   └── en.json
├── src/
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   └── app/
│       ├── [locale]/          # i18n 적용 페이지
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── not-found.tsx
│       │   ├── forbidden.tsx
│       │   ├── unauthorized.tsx
│       │   ├── articles/
│       │   ├── series/
│       │   ├── members/
│       │   └── design/
│       ├── terminal/          # i18n 제외 (한국어 전용)
│       │   └── page.tsx
│       └── api/
├── proxy.ts
└── next.config.ts
```

---

## 컨벤션

### 번역 키 네이밍

```
{namespace}.{category}.{key}

예시:
- navigation.home
- common.buttons.edit
- articles.list.title
- errors.notFound.title
```

### 메시지 파일 구조

```json
{
  "namespace": {
    "category": {
      "key": "value"
    }
  }
}
```

### 컴포넌트 번역 패턴

**Server Component:**

```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('namespace');
  return <div>{t('key')}</div>;
}
```

**Client Component (props 전달 방식):**

```tsx
// Parent (Server Component)
const t = await getTranslations('namespace');
<ClientComponent label={t('key')} />;

// Child (Client Component)
('use client');
function ClientComponent({ label }: { label: string }) {
  return <button>{label}</button>;
}
```

### packages/ui 컴포넌트 패턴

```tsx
// 기존 인터페이스 확장
interface Props {
  // ... 기존 props
  translations: {
    title: string;
    submit: string;
  };
}
```

---

## Phase 목록

| Phase | 파일                         | 설명                             | 예상 소요 |
| ----- | ---------------------------- | -------------------------------- | --------- |
| 1     | 01-phase-1-setup.md          | 패키지 설치, 설정 파일 생성      | 0.5일     |
| 2     | 02-phase-2-routing.md        | [locale] 라우팅 구조 변경        | 0.5일     |
| 3     | 03-phase-3-layout.md         | 레이아웃 & 네비게이션            | 1일       |
| 4     | 04-phase-4-common.md         | 공통 컴포넌트 (에러, 다이얼로그) | 1일       |
| 5     | 05-phase-5-pages-home.md     | 홈페이지                         | 0.5일     |
| 6     | 06-phase-6-pages-articles.md | 게시글 페이지들                  | 1.5일     |
| 7     | 07-phase-7-pages-series.md   | 시리즈 페이지들                  | 1일       |
| 8     | 08-phase-8-pages-member.md   | 멤버 프로필                      | 0.5일     |
| 9     | 09-phase-9-finishing.md      | 언어 전환 UI, SEO                | 1일       |

**총 예상 소요: 7.5일**

---

## 주의사항

1. **모든 커밋은 개발자가 직접 진행** - AI는 절대 자동으로 커밋하지 않음
2. **각 Phase는 독립적으로 커밋 가능**하도록 설계됨
3. **Phase 1-2는 순서대로** 진행 필수 (기반 설정)
4. **Phase 3 이후**는 의존성 낮아 병렬 작업 가능
5. **터미널 페이지**는 모든 Phase에서 제외
6. **packages/ui 수정 시** 기존 호환성 유지 (translations prop optional)

---

## 참고 자료

- [next-intl 공식 문서](https://next-intl-docs.vercel.app/)
- [Next.js App Router i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
