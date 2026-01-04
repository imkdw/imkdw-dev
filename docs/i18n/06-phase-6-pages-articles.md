# Phase 6: 게시글 페이지

## 개요

게시글 목록, 상세, 작성/수정 페이지에 i18n 적용

- **예상 소요**: 1.5일
- **선행 조건**: Phase 2 완료
- **커밋 단위**: 4개

---

## Task 6.1: 메시지 파일에 게시글 번역 추가

### 작업 내용

- `messages/ko.json`에 articles 네임스페이스 추가
- `messages/en.json`에 동일 구조 추가

### 파일 수정

#### `apps/blog/messages/ko.json` (추가)

```json
{
  "articles": {
    "list": {
      "title": "게시글",
      "totalArticles": "전체 게시글",
      "searchPlaceholder": "게시글 제목이나 내용으로 검색...",
      "noResults": "검색 결과가 없습니다",
      "filterAll": "전체"
    },
    "detail": {
      "relatedArticles": "관련 글",
      "tableOfContents": "목차",
      "share": "공유",
      "edit": "수정",
      "delete": "삭제"
    },
    "form": {
      "createTitle": "게시글 작성",
      "editTitle": "게시글 수정",
      "titlePlaceholder": "제목을 입력하세요",
      "slugPlaceholder": "URL Slug",
      "publish": "발행",
      "saveDraft": "임시저장"
    },
    "visibility": {
      "public": "공개",
      "publicDescription": "모든 사용자가 볼 수 있습니다",
      "private": "비공개",
      "privateDescription": "관리자만 볼 수 있습니다",
      "label": "게시글의 공개 상태를 설정하세요"
    },
    "series": {
      "selectLabel": "게시글이 속할 시리즈를 선택하세요",
      "noSeries": "시리즈 없음"
    },
    "tags": {
      "placeholder": "태그 추가",
      "addHint": "Enter 키로 빠르게 추가",
      "empty": "태그를 추가해보세요"
    },
    "stats": {
      "characters": "글자 수"
    },
    "toast": {
      "linkCopied": "클립보드에 글 링크가 저장되었습니다.",
      "deleted": "게시글이 삭제되었습니다.",
      "deleteFailed": "게시글 삭제에 실패했습니다."
    },
    "deleteDialog": {
      "title": "게시글 삭제",
      "description": "정말로 이 게시글을 삭제하시겠습니까?"
    }
  }
}
```

#### `apps/blog/messages/en.json` (추가)

```json
{
  "articles": {
    "list": {
      "title": "Articles",
      "totalArticles": "Total Articles",
      "searchPlaceholder": "Search by title or content...",
      "noResults": "No results found",
      "filterAll": "All"
    },
    "detail": {
      "relatedArticles": "Related Articles",
      "tableOfContents": "Table of Contents",
      "share": "Share",
      "edit": "Edit",
      "delete": "Delete"
    },
    "form": {
      "createTitle": "Write Article",
      "editTitle": "Edit Article",
      "titlePlaceholder": "Enter title",
      "slugPlaceholder": "URL Slug",
      "publish": "Publish",
      "saveDraft": "Save Draft"
    },
    "visibility": {
      "public": "Public",
      "publicDescription": "Visible to everyone",
      "private": "Private",
      "privateDescription": "Only visible to admins",
      "label": "Set the visibility of this article"
    },
    "series": {
      "selectLabel": "Select a series for this article",
      "noSeries": "No Series"
    },
    "tags": {
      "placeholder": "Add tag",
      "addHint": "Press Enter to add",
      "empty": "Add some tags"
    },
    "stats": {
      "characters": "Characters"
    },
    "toast": {
      "linkCopied": "Article link copied to clipboard.",
      "deleted": "Article has been deleted.",
      "deleteFailed": "Failed to delete article."
    },
    "deleteDialog": {
      "title": "Delete Article",
      "description": "Are you sure you want to delete this article?"
    }
  }
}
```

### 확인 사항

- [ ] `ko.json`에 articles 네임스페이스 추가됨
- [ ] `en.json`에 동일 구조 추가됨
- [ ] JSON 문법 오류 없음

### 커밋

```
feat(blog): add article page translations

- Add articles namespace with list, detail, form, visibility, series, tags, stats, toast, deleteDialog
```

---

## Task 6.2: 게시글 목록 페이지 i18n 적용

### 작업 내용

- `articles/page.tsx` i18n 적용
- `articles-content.tsx` i18n 적용
- `articles-header.tsx` i18n 적용
- `articles-filter.tsx` i18n 적용
- `articles-list.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/app/[locale]/articles/page.tsx`

```tsx
import { Layout } from '@/components/layout';
import { ArticlesContent } from '../../../components/article/articles-content';
import { getTagList, getArticles } from '@imkdw-dev/api-client';
import { ARTICLES_PER_PAGE } from '@/consts/article.const';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('articles.list');
  return {
    title: t('title'),
    description: t('title'),
  };
}

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Articles({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [articlesData, tags] = await Promise.all([
    getArticles({ page: currentPage, limit: ARTICLES_PER_PAGE }),
    getTagList(),
  ]);

  const t = await getTranslations('articles.list');

  const translations = {
    title: t('title'),
    totalArticles: t('totalArticles'),
    searchPlaceholder: t('searchPlaceholder'),
    noResults: t('noResults'),
    filterAll: t('filterAll'),
  };

  return (
    <Layout>
      <ArticlesContent articlesData={articlesData} tags={tags} currentPage={currentPage} translations={translations} />
    </Layout>
  );
}
```

#### `apps/blog/src/components/article/articles-content.tsx`

```tsx
'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { ArticlesHeader } from './articles-header';
import { ArticlesFilter } from './articles-filter';
import { ArticlesList } from './articles-list';
import { CommonPagination } from '../common/common-pagination';
import { ListHeader } from '../common/list-header';
import { IArticleListDto, ITagListItemDto } from '@imkdw-dev/types';

interface Props {
  articlesData: IArticleListDto;
  tags: ITagListItemDto[];
  currentPage: number;
  translations: {
    title: string;
    totalArticles: string;
    searchPlaceholder: string;
    noResults: string;
    filterAll: string;
  };
}

export function ArticlesContent({ articlesData, tags, currentPage, translations }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredArticles = articlesData.items.filter(article => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === null || article.tags.some(tag => tag.name === selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      <ListHeader
        title={translations.title}
        icon={FileText}
        stats={[{ label: translations.totalArticles, value: articlesData.totalCount, icon: FileText }]}
      />

      <ArticlesFilter
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        translations={{
          searchPlaceholder: translations.searchPlaceholder,
          filterAll: translations.filterAll,
        }}
      />

      <ArticlesList articles={filteredArticles} translations={{ noResults: translations.noResults }} />

      {articlesData.totalCount > 0 && (
        <CommonPagination
          currentPage={currentPage}
          totalPages={Math.ceil(articlesData.totalCount / 10)}
          baseUrl="/articles"
        />
      )}
    </div>
  );
}
```

#### `apps/blog/src/components/article/articles-filter.tsx`

```tsx
'use client';

import { Search } from 'lucide-react';
import { Input, Badge } from '@imkdw-dev/ui';
import { ITagListItemDto } from '@imkdw-dev/types';

interface Props {
  tags: ITagListItemDto[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  translations: {
    searchPlaceholder: string;
    filterAll: string;
  };
}

export function ArticlesFilter({ tags, selectedTag, onTagSelect, searchQuery, onSearchChange, translations }: Props) {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={translations.searchPlaceholder}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedTag === null ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onTagSelect(null)}
        >
          {translations.filterAll}
        </Badge>
        {tags.map(tag => (
          <Badge
            key={tag.id}
            variant={selectedTag === tag.name ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onTagSelect(tag.name)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
```

#### `apps/blog/src/components/article/articles-list.tsx`

```tsx
import { ArticleCard } from '@imkdw-dev/ui';
import { IArticleListItemDto } from '@imkdw-dev/types';

interface Props {
  articles: IArticleListItemDto[];
  translations: {
    noResults: string;
  };
}

export function ArticlesList({ articles, translations }: Props) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">{translations.noResults}</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
      {articles.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
```

### 확인 사항

- [ ] articles/page.tsx에 getTranslations 적용됨
- [ ] ArticlesContent에 translations props 추가됨
- [ ] ArticlesFilter에 translations props 추가됨
- [ ] ArticlesList에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨
- [ ] `/ko/articles`, `/en/articles` 에서 올바른 언어로 표시됨

### 커밋

```
feat(blog): apply i18n to article list page

- Update articles/page.tsx with translations
- Update ArticlesContent with translations prop
- Update ArticlesFilter with translations prop
- Update ArticlesList with translations prop
```

---

## Task 6.3: 게시글 상세 페이지 i18n 적용

### 작업 내용

- `articles/[slug]/page.tsx` i18n 적용
- `article-interactions.tsx` i18n 적용
- `related-articles.tsx` i18n 적용
- `delete-article-dialog.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/components/article/article-interactions.tsx`

```tsx
'use client';

import { Share2, Edit, Trash2 } from 'lucide-react';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@imkdw-dev/auth';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { useState } from 'react';
import { DeleteArticleDialog } from './delete-article-dialog';
import { deleteArticle } from '@imkdw-dev/api-client';
import Link from 'next/link';

interface Props {
  articleSlug: string;
  translations: {
    share: string;
    edit: string;
    delete: string;
    linkCopied: string;
    deleted: string;
    deleteFailed: string;
    deleteDialogTitle: string;
    deleteDialogDescription: string;
    cancel: string;
    deleting: string;
  };
}

export function ArticleInteractions({ articleSlug, translations }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const { member } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = member?.role === MEMBER_ROLE.ADMIN;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: '', description: translations.linkCopied });
    } catch {
      // Handle error silently
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteArticle(articleSlug);
      toast({ title: '', description: translations.deleted });
      router.push('/articles');
    } catch {
      toast({ description: translations.deleteFailed, variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-2" />
        {translations.share}
      </Button>

      {isAdmin && (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/articles/${articleSlug}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              {translations.edit}
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            {translations.delete}
          </Button>
        </>
      )}

      <DeleteArticleDialog
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

#### `apps/blog/src/components/article/related-articles.tsx`

```tsx
import { ArticleCard } from '@imkdw-dev/ui';
import { IArticleListItemDto } from '@imkdw-dev/types';

interface Props {
  articles: IArticleListItemDto[];
  translations: {
    title: string;
  };
}

export function RelatedArticles({ articles, translations }: Props) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold mb-6">{translations.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
```

#### `apps/blog/src/components/article/delete-article-dialog.tsx`

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

export function DeleteArticleDialog({ isOpen, onClose, onConfirm, isDeleting, translations }: Props) {
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

### 확인 사항

- [ ] ArticleInteractions에 translations props 추가됨
- [ ] RelatedArticles에 translations props 추가됨
- [ ] DeleteArticleDialog에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨

### 커밋

```
feat(blog): apply i18n to article detail page components

- Update ArticleInteractions with translations prop
- Update RelatedArticles with translations prop
- Update DeleteArticleDialog with translations prop
```

---

## Task 6.4: 게시글 작성/수정 폼 i18n 적용

### 작업 내용

- `article-form-header.tsx` i18n 적용
- `article-visibility-selector.tsx` i18n 적용
- `article-series-selector.tsx` i18n 적용
- `article-tag-manager.tsx` i18n 적용
- `article-writing-stats.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/components/article/article-form-header.tsx`

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

export function ArticleFormHeader({ mode, onPublish, translations }: Props) {
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

#### `apps/blog/src/components/article/article-visibility-selector.tsx`

```tsx
'use client';

import { RadioGroup, RadioGroupItem, Label } from '@imkdw-dev/ui';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  value: 'public' | 'private';
  onChange: (value: 'public' | 'private') => void;
  translations: {
    public: string;
    publicDescription: string;
    private: string;
    privateDescription: string;
    label: string;
  };
}

export function ArticleVisibilitySelector({ value, onChange, translations }: Props) {
  return (
    <div className="space-y-2">
      <RadioGroup value={value} onValueChange={onChange as (value: string) => void}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public" id="public" />
          <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer">
            <Eye className="h-4 w-4" />
            {translations.public}
          </Label>
        </div>
        <div className="text-xs text-muted-foreground/70">{translations.publicDescription}</div>

        <div className="flex items-center space-x-2 mt-2">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private" className="flex items-center gap-2 cursor-pointer">
            <EyeOff className="h-4 w-4" />
            {translations.private}
          </Label>
        </div>
        <div className="text-xs text-muted-foreground/70">{translations.privateDescription}</div>
      </RadioGroup>
      <p className="text-xs text-muted-foreground/70 mt-2">{translations.label}</p>
    </div>
  );
}
```

#### `apps/blog/src/components/article/article-writing-stats.tsx`

```tsx
interface Props {
  characterCount: number;
  translations: {
    characters: string;
  };
}

export function ArticleWritingStats({ characterCount, translations }: Props) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div>
        <span className="text-muted-foreground font-medium">{translations.characters}</span>
        <span className="ml-2 font-mono">{characterCount.toLocaleString()}</span>
      </div>
    </div>
  );
}
```

### 확인 사항

- [ ] ArticleFormHeader에 translations props 추가됨
- [ ] ArticleVisibilitySelector에 translations props 추가됨
- [ ] ArticleWritingStats에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨
- [ ] 게시글 작성/수정 페이지에서 번역 전달 필요

### 커밋

```
feat(blog): apply i18n to article form components

- Update ArticleFormHeader with translations prop
- Update ArticleVisibilitySelector with translations prop
- Update ArticleWritingStats with translations prop
```

---

## Phase 6 완료 체크리스트

- [ ] Task 6.1 완료 및 커밋
- [ ] Task 6.2 완료 및 커밋
- [ ] Task 6.3 완료 및 커밋
- [ ] Task 6.4 완료 및 커밋
- [ ] `/ko/articles` 한국어 표시 확인
- [ ] `/en/articles` 영어 표시 확인
- [ ] 게시글 상세 페이지 번역 확인
- [ ] 게시글 작성/수정 폼 번역 확인
- [ ] 전체 빌드 테스트 (`pnpm build`)

## 다음 Phase

Phase 6 완료 후 [Phase 7: 시리즈 페이지](./07-phase-7-pages-series.md)로 진행
