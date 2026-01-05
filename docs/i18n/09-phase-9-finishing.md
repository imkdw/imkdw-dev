# Phase 9: 마무리

## 개요

언어 전환 UI 추가, SEO 최적화, 최종 테스트

- **예상 소요**: 1일
- **선행 조건**: Phase 1-8 완료
- **커밋 단위**: 3개

---

## Task 9.1: 언어 전환 UI 추가

### 작업 내용

- `LocaleSwitcher` 컴포넌트 생성
- Header에 언어 전환 버튼 추가

### 파일 생성

#### `apps/blog/src/components/locale-switcher.tsx`

```tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@imkdw-dev/ui';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@imkdw-dev/ui';
import { Globe } from 'lucide-react';
import { routing } from '@/i18n/routing';

const localeNames: Record<string, string> = {
  ko: '한국어',
  en: 'English',
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map(loc => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={locale === loc ? 'bg-muted' : ''}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

#### `packages/ui/src/components/layout/header/header.tsx` (수정)

Header 컴포넌트에 LocaleSwitcher를 추가할 수 있도록 slot 추가:

```tsx
interface Props {
  onSearch?: (query: string) => void;
  onLogout?: () => Promise<void>;
  translations: {
    navigation: {
      /* ... */
    };
    auth: {
      /* ... */
    };
  };
  localeSwitcher?: React.ReactNode; // 추가
}

export function Header({ onSearch, onLogout, translations, localeSwitcher }: Props) {
  // ...

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="terminal-header items-center justify-between">
        {/* ... */}

        <div className="flex items-center space-x-1 gap-2">
          {localeSwitcher} {/* 추가 */}
          <MemberMenu onLogin={handleLogin} onLogout={onLogout} translations={translations.auth} />
        </div>
      </div>
      {/* ... */}
    </header>
  );
}
```

#### `apps/blog/src/components/layout.tsx` (수정)

```tsx
import { Header, Footer, Layout as BaseLayout } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';
import { LocaleSwitcher } from './locale-switcher';

interface Props {
  children: React.ReactNode;
}

export async function Layout({ children }: Props) {
  const tNav = await getTranslations('navigation');
  const tAuth = await getTranslations('auth');

  const headerTranslations = {
    navigation: {
      articles: tNav('articles'),
      series: tNav('series'),
      searchPlaceholder: tNav('searchPlaceholder'),
    },
    auth: {
      login: tAuth('login'),
      logout: tAuth('logout'),
      loginWithGoogle: tAuth('loginWithGoogle'),
      loginWithGithub: tAuth('loginWithGithub'),
      mypage: tAuth('mypage'),
      writeArticle: tAuth('writeArticle'),
      autoSignup: tAuth('autoSignup'),
    },
  };

  return (
    <BaseLayout header={<Header translations={headerTranslations} localeSwitcher={<LocaleSwitcher />} />}>
      {children}
    </BaseLayout>
  );
}
```

### 확인 사항

- [ ] LocaleSwitcher 컴포넌트 생성됨
- [ ] Header에 localeSwitcher slot 추가됨
- [ ] Layout에서 LocaleSwitcher 전달됨
- [ ] 언어 전환 시 현재 페이지 유지되며 locale만 변경됨
- [ ] URL이 `/ko/...` ↔ `/en/...` 로 변경됨

### 커밋

```
feat(blog): add locale switcher component

- Create LocaleSwitcher component with dropdown menu
- Add localeSwitcher slot to Header component
- Integrate LocaleSwitcher into Layout
```

---

## Task 9.2: SEO 최적화 (alternate links)

### 작업 내용

- 각 페이지에 alternate language links 메타데이터 추가
- sitemap.xml에 hreflang 추가 (있는 경우)

### 파일 수정

#### `apps/blog/src/app/[locale]/layout.tsx` (메타데이터 수정)

```tsx
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // 현재 URL의 base path 가져오기
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.imkdw.dev';

  // alternate links 생성
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    title: {
      default: t('siteTitle'),
      template: `%s | ${t('siteTitle')}`,
    },
    description: t('siteDescription'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      locale: locale,
      alternateLocale: routing.locales.filter(l => l !== locale),
    },
  };
}
```

#### 각 페이지별 alternate links 추가 예시

```tsx
// articles/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('articles.list');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.imkdw.dev';

  return {
    title: t('title'),
    alternates: {
      canonical: `${baseUrl}/${locale}/articles`,
      languages: {
        ko: `${baseUrl}/ko/articles`,
        en: `${baseUrl}/en/articles`,
      },
    },
  };
}
```

### 확인 사항

- [ ] layout.tsx에 alternate languages 메타데이터 추가됨
- [ ] 페이지 소스에서 `<link rel="alternate" hreflang="...">` 확인
- [ ] OpenGraph locale 설정 확인
- [ ] 검색엔진이 다국어 페이지 인식할 수 있도록 설정됨

### 커밋

```
feat(blog): add SEO alternate language links

- Add alternate languages metadata to layout
- Add canonical URLs for each locale
- Configure OpenGraph locale settings
```

---

## Task 9.3: 최종 테스트 및 정리

### 작업 내용

- 전체 페이지 언어 전환 테스트
- 누락된 번역 확인 및 추가
- 빌드 테스트
- 문서 정리

### 테스트 체크리스트

#### 페이지별 테스트

| 페이지      | 한국어 (/ko) | 영어 (/en) |
| ----------- | ------------ | ---------- |
| 홈          | [ ]          | [ ]        |
| 게시글 목록 | [ ]          | [ ]        |
| 게시글 상세 | [ ]          | [ ]        |
| 게시글 작성 | [ ]          | [ ]        |
| 게시글 수정 | [ ]          | [ ]        |
| 시리즈 목록 | [ ]          | [ ]        |
| 시리즈 상세 | [ ]          | [ ]        |
| 시리즈 작성 | [ ]          | [ ]        |
| 시리즈 수정 | [ ]          | [ ]        |
| 멤버 프로필 | [ ]          | [ ]        |
| 404 페이지  | [ ]          | [ ]        |
| 403 페이지  | [ ]          | [ ]        |
| 401 페이지  | [ ]          | [ ]        |

#### 기능 테스트

| 기능            | 테스트                                 |
| --------------- | -------------------------------------- |
| 언어 전환       | [ ] Header의 언어 전환 버튼 동작       |
| URL 리다이렉트  | [ ] `/` 접속 시 `/ko`로 리다이렉트     |
| 언어 유지       | [ ] 페이지 이동 시 선택한 언어 유지    |
| 로그인 모달     | [ ] 양쪽 언어에서 정상 동작            |
| Toast 메시지    | [ ] 양쪽 언어에서 정상 표시            |
| 삭제 다이얼로그 | [ ] 양쪽 언어에서 정상 표시            |
| 네비게이션      | [ ] 모바일/데스크탑 양쪽 언어에서 정상 |

#### 빌드 테스트

```bash
# 전체 빌드
pnpm build

# 타입 체크
pnpm check-types

# 린트
pnpm lint
```

### 누락 번역 확인 스크립트 (선택적)

`scripts/check-translations.ts` 생성하여 ko.json과 en.json의 키 일치 확인:

```typescript
import koMessages from '../messages/ko.json';
import enMessages from '../messages/en.json';

function getKeys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      return getKeys(value as object, newKey);
    }
    return [newKey];
  });
}

const koKeys = new Set(getKeys(koMessages));
const enKeys = new Set(getKeys(enMessages));

const missingInEn = [...koKeys].filter(k => !enKeys.has(k));
const missingInKo = [...enKeys].filter(k => !koKeys.has(k));

if (missingInEn.length > 0) {
  console.log('Missing in en.json:', missingInEn);
}

if (missingInKo.length > 0) {
  console.log('Missing in ko.json:', missingInKo);
}

if (missingInEn.length === 0 && missingInKo.length === 0) {
  console.log('All translations are complete!');
}
```

### 확인 사항

- [ ] 모든 페이지 한국어/영어 테스트 완료
- [ ] 모든 기능 테스트 완료
- [ ] 빌드 성공
- [ ] 타입 에러 없음
- [ ] 린트 에러 없음
- [ ] 누락된 번역 없음

### 커밋

```
chore(blog): complete i18n implementation and testing

- Verify all pages work in both languages
- Fix any missing translations
- Ensure build passes
```

---

## Phase 9 완료 체크리스트

- [ ] Task 9.1 완료 및 커밋
- [ ] Task 9.2 완료 및 커밋
- [ ] Task 9.3 완료 및 커밋
- [ ] 언어 전환 UI 정상 동작
- [ ] SEO 메타데이터 확인
- [ ] 전체 테스트 통과
- [ ] 프로덕션 배포 준비 완료

---

## 전체 프로젝트 완료 체크리스트

- [ ] Phase 1: 기반 설정 완료
- [ ] Phase 2: 라우팅 구조 변경 완료
- [ ] Phase 3: 레이아웃 & 네비게이션 완료
- [ ] Phase 4: 공통 컴포넌트 완료
- [ ] Phase 5: 홈페이지 완료
- [ ] Phase 6: 게시글 페이지 완료
- [ ] Phase 7: 시리즈 페이지 완료
- [ ] Phase 8: 멤버 프로필 완료
- [ ] Phase 9: 마무리 완료

## 향후 고려사항

1. **API 데이터 다국어 지원**: 게시글 제목/내용 등 사용자 생성 콘텐츠의 다국어 지원
2. **날짜/시간 포맷**: locale에 따른 날짜/시간 표시 형식 변경
3. **숫자 포맷**: locale에 따른 숫자 표시 형식 (천 단위 구분자 등)
4. **추가 언어**: 필요시 다른 언어 추가 (일본어, 중국어 등)
5. **번역 관리 도구**: Crowdin, Lokalise 등 번역 관리 플랫폼 연동
