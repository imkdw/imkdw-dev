# Phase 7: 시리즈 페이지

## 개요

시리즈 목록, 상세, 작성/수정 페이지에 i18n 적용

- **예상 소요**: 1일
- **선행 조건**: Phase 2 완료
- **커밋 단위**: 3개

---

## Task 7.1: 메시지 파일에 시리즈 번역 추가

### 작업 내용

- `messages/ko.json`에 series 네임스페이스 추가
- `messages/en.json`에 동일 구조 추가

### 파일 수정

#### `apps/blog/messages/ko.json` (추가)

```json
{
  "series": {
    "list": {
      "title": "시리즈",
      "totalArticles": "총 글 수",
      "empty": "시리즈가 없습니다",
      "emptyDescription": "새로운 시리즈를 기다려주세요"
    },
    "detail": {
      "articleList": "시리즈 글 목록",
      "articleNumber": "번호",
      "articleTitle": "제목",
      "readingTime": "읽기 시간",
      "createdAt": "작성일",
      "read": "읽기"
    },
    "form": {
      "createTitle": "시리즈 작성",
      "editTitle": "시리즈 수정",
      "titlePlaceholder": "시리즈 제목",
      "slugPlaceholder": "URL Slug",
      "descriptionPlaceholder": "시리즈 설명을 입력하세요",
      "publish": "발행"
    },
    "actions": {
      "edit": "수정",
      "delete": "삭제",
      "back": "뒤로"
    },
    "toast": {
      "deleted": "시리즈가 삭제되었습니다.",
      "deleteFailed": "시리즈 삭제에 실패했습니다."
    },
    "deleteDialog": {
      "title": "시리즈 삭제",
      "description": "정말로 이 시리즈를 삭제하시겠습니까?"
    },
    "stats": {
      "totalArticles": "총 글 수",
      "totalViews": "총 조회수",
      "lastUpdated": "마지막 업데이트"
    }
  }
}
```

#### `apps/blog/messages/en.json` (추가)

```json
{
  "series": {
    "list": {
      "title": "Series",
      "totalArticles": "Total Articles",
      "empty": "No series found",
      "emptyDescription": "Stay tuned for new series"
    },
    "detail": {
      "articleList": "Articles in Series",
      "articleNumber": "#",
      "articleTitle": "Title",
      "readingTime": "Read Time",
      "createdAt": "Created",
      "read": "Read"
    },
    "form": {
      "createTitle": "Create Series",
      "editTitle": "Edit Series",
      "titlePlaceholder": "Series Title",
      "slugPlaceholder": "URL Slug",
      "descriptionPlaceholder": "Enter series description",
      "publish": "Publish"
    },
    "actions": {
      "edit": "Edit",
      "delete": "Delete",
      "back": "Back"
    },
    "toast": {
      "deleted": "Series has been deleted.",
      "deleteFailed": "Failed to delete series."
    },
    "deleteDialog": {
      "title": "Delete Series",
      "description": "Are you sure you want to delete this series?"
    },
    "stats": {
      "totalArticles": "Total Articles",
      "totalViews": "Total Views",
      "lastUpdated": "Last Updated"
    }
  }
}
```

### 확인 사항

- [ ] `ko.json`에 series 네임스페이스 추가됨
- [ ] `en.json`에 동일 구조 추가됨
- [ ] JSON 문법 오류 없음

### 커밋

```
feat(blog): add series page translations

- Add series namespace with list, detail, form, actions, toast, deleteDialog, stats
```

---

## Task 7.2: 시리즈 목록 페이지 i18n 적용

### 작업 내용

- `series/page.tsx` i18n 적용
- `series-list-grid.tsx` i18n 적용
- `series-list-empty.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/app/[locale]/series/page.tsx`

```tsx
import { Layout } from '@/components/layout';
import { ListHeader } from '@/components/common/list-header';
import { SeriesListGrid } from '@/components/series/series-list-grid';
import { SeriesListEmpty } from '@/components/series/series-list-empty';
import { getSeriesList, getStats } from '@imkdw-dev/api-client';
import { BookOpen, FileText } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('series.list');
  return {
    title: t('title'),
    description: t('title'),
  };
}

export default async function SeriesPage() {
  const [seriesList, stats] = await Promise.all([getSeriesList({ page: 1, limit: 100 }), getStats()]);

  const t = await getTranslations('series');

  const translations = {
    list: {
      title: t('list.title'),
      totalArticles: t('list.totalArticles'),
      empty: t('list.empty'),
      emptyDescription: t('list.emptyDescription'),
    },
  };

  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <ListHeader
          title={translations.list.title}
          icon={BookOpen}
          stats={[{ label: translations.list.totalArticles, value: stats.article.count, icon: FileText }]}
        />

        {seriesList.items.length === 0 ? (
          <SeriesListEmpty translations={translations.list} />
        ) : (
          <SeriesListGrid seriesList={seriesList.items} />
        )}
      </div>
    </Layout>
  );
}
```

#### `apps/blog/src/components/series/series-list-empty.tsx`

```tsx
import { BookOpen } from 'lucide-react';

interface Props {
  translations: {
    empty: string;
    emptyDescription: string;
  };
}

export function SeriesListEmpty({ translations }: Props) {
  return (
    <div className="text-center py-12">
      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold pb-2">{translations.empty}</h3>
      <p className="text-muted-foreground">{translations.emptyDescription}</p>
    </div>
  );
}
```

### 확인 사항

- [ ] series/page.tsx에 getTranslations 적용됨
- [ ] SeriesListEmpty에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨
- [ ] `/ko/series`, `/en/series` 에서 올바른 언어로 표시됨

### 커밋

```
feat(blog): apply i18n to series list page

- Update series/page.tsx with translations
- Update SeriesListEmpty with translations prop
```

---

## Task 7.3: 시리즈 상세 및 폼 컴포넌트 i18n 적용

### 작업 내용

- `series-articles.tsx` i18n 적용
- `series-actions.tsx` i18n 적용
- `series-form-header.tsx` i18n 적용
- `series-stats-cards.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/components/series/series-articles.tsx`

```tsx
import Link from 'next/link';
import { Button } from '@imkdw-dev/ui';
import { ISeriesArticleDto } from '@imkdw-dev/types';
import { ArrowRight } from 'lucide-react';

interface Props {
  articles: ISeriesArticleDto[];
  translations: {
    title: string;
    articleNumber: string;
    articleTitle: string;
    readingTime: string;
    createdAt: string;
    read: string;
  };
}

export function SeriesArticles({ articles, translations }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{translations.title}</h2>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">{translations.articleNumber}</th>
              <th className="px-4 py-3 text-left text-sm font-medium">{translations.articleTitle}</th>
              <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">
                {translations.readingTime}
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">{translations.createdAt}</th>
              <th className="px-4 py-3 text-right text-sm font-medium">{translations.read}</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article.slug} className="border-t hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm text-muted-foreground">{index + 1}</td>
                <td className="px-4 py-3">
                  <Link href={`/articles/${article.slug}`} className="font-medium hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                  {article.readingTime}min
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/articles/${article.slug}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

#### `apps/blog/src/components/series/series-actions.tsx`

```tsx
'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@imkdw-dev/auth';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { useState } from 'react';
import { DeleteConfirmDialog } from '../common/delete-confirm-dialog';
import { deleteSeries } from '@imkdw-dev/api-client';
import Link from 'next/link';

interface Props {
  seriesSlug: string;
  translations: {
    edit: string;
    delete: string;
    deleted: string;
    deleteFailed: string;
    deleteDialogTitle: string;
    deleteDialogDescription: string;
    cancel: string;
    deleting: string;
  };
}

export function SeriesActions({ seriesSlug, translations }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const { member } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = member?.role === MEMBER_ROLE.ADMIN;

  if (!isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSeries(seriesSlug);
      toast({ title: '', description: translations.deleted });
      router.push('/series');
    } catch {
      toast({ description: translations.deleteFailed, variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/series/${seriesSlug}/edit`}>
          <Edit className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{translations.edit}</span>
        </Link>
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)}>
        <Trash2 className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">{translations.delete}</span>
      </Button>

      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        translations={{
          title: translations.deleteDialogTitle,
          description: translations.deleteDialogDescription,
          cancel: translations.cancel,
          delete: translations.delete,
          deleting: translations.deleting,
        }}
      />
    </div>
  );
}
```

#### `apps/blog/src/components/series/series-form-header.tsx`

```tsx
import { Button } from '@imkdw-dev/ui';
import { Send } from 'lucide-react';

interface Props {
  mode: 'create' | 'edit';
  onPublish: () => void;
  translations: {
    createTitle: string;
    editTitle: string;
    publish: string;
  };
}

export function SeriesFormHeader({ mode, onPublish, translations }: Props) {
  const title = mode === 'create' ? translations.createTitle : translations.editTitle;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8 pb-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <Button className="flex items-center gap-2 flex-1 sm:flex-initial" onClick={onPublish}>
          <Send className="w-4 h-4" />
          {translations.publish}
        </Button>
      </div>
    </div>
  );
}
```

#### `apps/blog/src/components/series/series-stats-cards.tsx`

```tsx
import { FileText, Eye, Calendar } from 'lucide-react';
import { Card, CardContent } from '@imkdw-dev/ui';

interface Props {
  articleCount: number;
  totalViews: number;
  lastUpdated: string;
  translations: {
    totalArticles: string;
    totalViews: string;
    lastUpdated: string;
  };
}

export function SeriesStatsCards({ articleCount, totalViews, lastUpdated, translations }: Props) {
  const stats = [
    {
      label: translations.totalArticles,
      value: articleCount,
      icon: FileText,
    },
    {
      label: translations.totalViews,
      value: totalViews.toLocaleString(),
      icon: Eye,
    },
    {
      label: translations.lastUpdated,
      value: new Date(lastUpdated).toLocaleDateString(),
      icon: Calendar,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(stat => (
        <Card key={stat.label}>
          <CardContent className="p-4 flex items-center gap-3">
            <stat.icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-semibold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### 확인 사항

- [ ] SeriesArticles에 translations props 추가됨
- [ ] SeriesActions에 translations props 추가됨
- [ ] SeriesFormHeader에 translations props 추가됨
- [ ] SeriesStatsCards에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨

### 커밋

```
feat(blog): apply i18n to series detail and form components

- Update SeriesArticles with translations prop
- Update SeriesActions with translations prop
- Update SeriesFormHeader with translations prop
- Update SeriesStatsCards with translations prop
```

---

## Phase 7 완료 체크리스트

- [ ] Task 7.1 완료 및 커밋
- [ ] Task 7.2 완료 및 커밋
- [ ] Task 7.3 완료 및 커밋
- [ ] `/ko/series` 한국어 표시 확인
- [ ] `/en/series` 영어 표시 확인
- [ ] 시리즈 상세 페이지 번역 확인
- [ ] 시리즈 작성/수정 폼 번역 확인
- [ ] 전체 빌드 테스트 (`pnpm build`)

## 다음 Phase

Phase 7 완료 후 [Phase 8: 멤버 프로필](./08-phase-8-pages-member.md)로 진행
