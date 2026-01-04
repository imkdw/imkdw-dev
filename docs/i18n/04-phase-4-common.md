# Phase 4: 공통 컴포넌트

## 개요

에러 페이지, 다이얼로그 등 공통 컴포넌트에 i18n 적용

- **예상 소요**: 1일
- **선행 조건**: Phase 2 완료 (Phase 3과 병렬 가능)
- **커밋 단위**: 3개

---

## Task 4.1: 메시지 파일에 에러 및 공통 번역 추가

### 작업 내용

- `messages/ko.json`에 errors, common 네임스페이스 추가
- `messages/en.json`에 동일 구조 추가

### 파일 수정

#### `apps/blog/messages/ko.json` (추가)

```json
{
  "errors": {
    "notFound": {
      "title": "404 - 페이지를 찾을 수 없습니다",
      "description": "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
      "goHome": "홈으로 돌아가기",
      "viewArticles": "게시글 목록"
    },
    "forbidden": {
      "title": "403 - 접근 금지",
      "description": "이 페이지에 접근할 권한이 없습니다.",
      "subDescription": "관리자에게 문의하시거나 다른 페이지를 이용해 주세요.",
      "goHome": "홈으로 돌아가기",
      "contact": "문의하기"
    },
    "unauthorized": {
      "title": "401 - 인증 필요",
      "description": "이 페이지를 보려면 로그인이 필요합니다.",
      "goHome": "홈으로 돌아가기",
      "login": "로그인"
    }
  },
  "common": {
    "buttons": {
      "edit": "수정",
      "delete": "삭제",
      "cancel": "취소",
      "save": "저장",
      "confirm": "확인",
      "close": "닫기"
    },
    "status": {
      "loading": "로딩 중...",
      "deleting": "삭제 중...",
      "saving": "저장 중..."
    },
    "dialog": {
      "deleteTitle": "삭제 확인",
      "deleteDescription": "정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
      "draftTitle": "임시 저장된 글이 있습니다",
      "draftDescription": "이전에 작성하던 글이 발견되었습니다",
      "draftRestore": "복원",
      "draftDiscard": "삭제"
    }
  }
}
```

#### `apps/blog/messages/en.json` (추가)

```json
{
  "errors": {
    "notFound": {
      "title": "404 - Page Not Found",
      "description": "The page you requested does not exist or has been moved.",
      "goHome": "Go Home",
      "viewArticles": "View Articles"
    },
    "forbidden": {
      "title": "403 - Forbidden",
      "description": "You do not have permission to access this page.",
      "subDescription": "Please contact the administrator or try another page.",
      "goHome": "Go Home",
      "contact": "Contact"
    },
    "unauthorized": {
      "title": "401 - Unauthorized",
      "description": "You need to log in to view this page.",
      "goHome": "Go Home",
      "login": "Login"
    }
  },
  "common": {
    "buttons": {
      "edit": "Edit",
      "delete": "Delete",
      "cancel": "Cancel",
      "save": "Save",
      "confirm": "Confirm",
      "close": "Close"
    },
    "status": {
      "loading": "Loading...",
      "deleting": "Deleting...",
      "saving": "Saving..."
    },
    "dialog": {
      "deleteTitle": "Confirm Delete",
      "deleteDescription": "Are you sure you want to delete? This action cannot be undone.",
      "draftTitle": "Draft Found",
      "draftDescription": "A previously saved draft was found",
      "draftRestore": "Restore",
      "draftDiscard": "Discard"
    }
  }
}
```

### 확인 사항

- [ ] `ko.json`에 errors, common 추가됨
- [ ] `en.json`에 동일 구조 추가됨
- [ ] JSON 문법 오류 없음

### 커밋

```
feat(blog): add error and common translations

- Add errors namespace (404, 403, 401 pages)
- Add common namespace (buttons, status, dialog)
```

---

## Task 4.2: 에러 페이지 i18n 적용

### 작업 내용

- `not-found.tsx` i18n 적용
- `forbidden.tsx` i18n 적용
- `unauthorized.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/app/[locale]/not-found.tsx`

```tsx
import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('errors.notFound');

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild>
                <Link href="/">{t('goHome')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/articles">{t('viewArticles')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
```

#### `apps/blog/src/app/[locale]/forbidden.tsx`

```tsx
import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';

export default async function Forbidden() {
  const t = await getTranslations('errors.forbidden');

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{t('description')}</p>
            <p className="text-sm text-muted-foreground">{t('subDescription')}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">{t('goHome')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">{t('contact')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
```

#### `apps/blog/src/app/[locale]/unauthorized.tsx`

```tsx
import Link from 'next/link';
import { Layout, Button, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { getTranslations } from 'next-intl/server';

export default async function Unauthorized() {
  const t = await getTranslations('errors.unauthorized');

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-destructive">{t('title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{t('description')}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" asChild>
                <Link href="/">{t('goHome')}</Link>
              </Button>
              <Button asChild>
                <Link href="/login">{t('login')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
```

### 확인 사항

- [ ] not-found.tsx에 getTranslations 적용됨
- [ ] forbidden.tsx에 getTranslations 적용됨
- [ ] unauthorized.tsx에 getTranslations 적용됨
- [ ] 모든 하드코딩된 텍스트 제거됨
- [ ] `/ko`, `/en` 에서 각각 올바른 언어로 표시됨

### 커밋

```
feat(blog): apply i18n to error pages

- Update not-found.tsx with translations
- Update forbidden.tsx with translations
- Update unauthorized.tsx with translations
```

---

## Task 4.3: 공통 다이얼로그 컴포넌트 i18n 적용

### 작업 내용

- `delete-confirm-dialog.tsx` i18n 적용
- `draft-restore-dialog.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/components/common/delete-confirm-dialog.tsx`

```tsx
'use client';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@imkdw-dev/ui';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  translations: {
    title: string;
    description: string;
    cancel: string;
    delete: string;
    deleting: string;
  };
}

export function DeleteConfirmDialog({ isOpen, onClose, onConfirm, isDeleting, translations }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
          <DialogDescription>{translations.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            {translations.cancel}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? translations.deleting : translations.delete}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

#### `apps/blog/src/components/common/draft-restore-dialog.tsx`

```tsx
'use client';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@imkdw-dev/ui';

interface Props {
  isOpen: boolean;
  onRestore: () => void;
  onDiscard: () => void;
  translations: {
    title: string;
    description: string;
    restore: string;
    discard: string;
  };
}

export function DraftRestoreDialog({ isOpen, onRestore, onDiscard, translations }: Props) {
  return (
    <Dialog open={isOpen} onClose={onDiscard}>
      <DialogContent onClose={onDiscard}>
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
          <DialogDescription>{translations.description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onDiscard}>
            {translations.discard}
          </Button>
          <Button onClick={onRestore}>{translations.restore}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### 사용 예시 (부모 컴포넌트에서)

```tsx
// Server Component에서 번역 가져와서 Client Component로 전달
const t = await getTranslations('common.dialog');

<DeleteConfirmDialog
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleDelete}
  isDeleting={isDeleting}
  translations={{
    title: t('deleteTitle'),
    description: t('deleteDescription'),
    cancel: tCommon('buttons.cancel'),
    delete: tCommon('buttons.delete'),
    deleting: tCommon('status.deleting'),
  }}
/>;
```

### 확인 사항

- [ ] DeleteConfirmDialog에 translations props 추가됨
- [ ] DraftRestoreDialog에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨
- [ ] 컴포넌트 사용처에서 번역 전달 필요 (Phase 6, 7에서 처리)

### 커밋

```
feat(blog): apply i18n to common dialog components

- Update DeleteConfirmDialog with translations prop
- Update DraftRestoreDialog with translations prop
- Remove hardcoded Korean text
```

---

## Phase 4 완료 체크리스트

- [ ] Task 4.1 완료 및 커밋
- [ ] Task 4.2 완료 및 커밋
- [ ] Task 4.3 완료 및 커밋
- [ ] 에러 페이지 양쪽 언어에서 정상 표시
- [ ] 다이얼로그 컴포넌트 빌드 성공
- [ ] 전체 빌드 테스트 (`pnpm build`)

## 다음 Phase

Phase 4 완료 후 [Phase 5: 홈페이지](./05-phase-5-pages-home.md)로 진행
