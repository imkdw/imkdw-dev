import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle, updateArticle } from '@imkdw-dev/api-client';
import { IArticleDto } from '@imkdw-dev/types';
import { ArticleFormMode } from '@/types/article';

interface ArticleDraftData {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  seriesId: string;
  uploadedImageUrls: string[];
  savedAt: number;
}

const AUTO_SAVE_INTERVAL = 5000;

function getStorageKey(mode: ArticleFormMode, slug?: string): string {
  return mode === 'create' ? 'article-draft-new' : `article-draft-edit-${slug}`;
}

function saveDraft(key: string, data: ArticleDraftData): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadDraft(key: string): ArticleDraftData | null {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    return JSON.parse(stored) as ArticleDraftData;
  } catch {
    return null;
  }
}

function clearDraft(key: string): void {
  localStorage.removeItem(key);
}

interface UseArticleFormParams {
  mode: ArticleFormMode;
  initialData?: IArticleDto;
}

export function useArticleForm({ mode, initialData }: UseArticleFormParams) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [tags, setTags] = useState<string[]>(initialData?.tags.map(tag => tag.name) ?? []);
  const [seriesId, setSeriesId] = useState(initialData?.series.id ?? '');
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const draftDetectionRan = useRef(false);

  const storageKey = useMemo(() => getStorageKey(mode, initialData?.slug), [mode, initialData?.slug]);

  useEffect(() => {
    if (draftDetectionRan.current) return;
    draftDetectionRan.current = true;

    const draft = loadDraft(storageKey);
    if (!draft) return;

    if (mode === 'edit' && initialData) {
      const hasDifferences =
        draft.title !== initialData.title ||
        draft.slug !== initialData.slug ||
        draft.content !== initialData.content ||
        JSON.stringify(draft.tags) !== JSON.stringify(initialData.tags.map(t => t.name)) ||
        draft.seriesId !== initialData.series.id;

      if (hasDifferences) {
        setShowRestoreDialog(true);
      }
    } else if (mode === 'create') {
      const hasContent =
        draft.title.trim() !== '' ||
        draft.slug.trim() !== '' ||
        draft.content.trim() !== '' ||
        draft.tags.length > 0 ||
        draft.seriesId.trim() !== '';

      if (hasContent) {
        setShowRestoreDialog(true);
      }
    }
  }, [storageKey, mode, initialData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const draftData: ArticleDraftData = {
        title,
        slug,
        content,
        tags,
        seriesId,
        uploadedImageUrls,
        savedAt: Date.now(),
      };
      saveDraft(storageKey, draftData);
    }, AUTO_SAVE_INTERVAL);

    return () => clearTimeout(timer);
  }, [title, slug, content, tags, seriesId, uploadedImageUrls, storageKey]);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => setTags(tags.filter(tag => tag !== tagToRemove));

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImageUrls(prev => [...prev, imageUrl]);
  };

  const handleRestoreDraft = () => {
    const draft = loadDraft(storageKey);
    if (draft) {
      setTitle(draft.title);
      setSlug(draft.slug);
      setContent(draft.content);
      setTags(draft.tags);
      setSeriesId(draft.seriesId);
      setUploadedImageUrls(draft.uploadedImageUrls);
    }
    setShowRestoreDialog(false);
  };

  const handleDiscardDraft = () => {
    clearDraft(storageKey);
    setShowRestoreDialog(false);
  };

  const handlePublish = async () => {
    if (isPublishing) {
      return;
    }

    setIsPublishing(true);

    try {
      if (mode === 'create') {
        const result = await createArticle({ title, slug, content, tags, seriesId, uploadedImageUrls });
        clearDraft(storageKey);
        router.push(`/articles/${result.slug}`);
      } else {
        await updateArticle(slug, { title, content, tags, seriesId, uploadedImageUrls });
        clearDraft(storageKey);
        router.push(`/articles/${slug}`);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    formData: {
      title,
      slug,
      content,
      tags,
      seriesId,
    },
    handlers: {
      setTitle,
      setSlug,
      setContent,
      setSeriesId,
      handleAddTag,
      handleRemoveTag,
      handleImageUpload,
      handlePublish,
      handleRestoreDraft,
      handleDiscardDraft,
    },
    state: {
      isPublishing,
      showRestoreDialog,
    },
  };
}
