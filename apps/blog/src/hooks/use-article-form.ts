import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle, updateArticle } from '@imkdw-dev/api-client';
import { IArticleDto } from '@imkdw-dev/types';
import { ARTICLE_STATE } from '@imkdw-dev/consts';
import { ArticleFormMode } from '@/types/article';

interface ArticleDraftData {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  seriesId: string;
  state: string;
  uploadedImageUrls: string[];
  savedAt: number;
}

const AUTO_SAVE_INTERVAL = 5_000;

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
    localStorage.removeItem(key);
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
  const [state, setState] = useState(initialData?.state ?? ARTICLE_STATE.NORMAL);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  const draftDetectionRan = useRef(false);
  const replaceEditorContentRef = useRef<((content: string) => void) | null>(null);

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
        draft.seriesId !== initialData.series.id ||
        draft.state !== initialData.state;

      if (hasDifferences) {
        setShowRestoreDialog(true);
      }
    } else if (mode === 'create') {
      const hasContent =
        draft.title.trim() !== '' ||
        draft.slug.trim() !== '' ||
        draft.content.trim() !== '' ||
        draft.tags.length > 0 ||
        draft.seriesId.trim() !== '' ||
        draft.state !== ARTICLE_STATE.NORMAL;

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
        state,
        uploadedImageUrls,
        savedAt: Date.now(),
      };
      saveDraft(storageKey, draftData);
    }, AUTO_SAVE_INTERVAL);

    return () => clearTimeout(timer);
  }, [title, slug, content, tags, seriesId, state, uploadedImageUrls, storageKey]);

  const handleAddTag = useCallback((tag: string) => {
    setTags(prev => {
      if (prev.includes(tag)) return prev;
      return [...prev, tag];
    });
  }, []);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  }, []);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImageUrls(prev => [...prev, imageUrl]);
  };

  const handleEditorReady = useCallback((replaceContent: (content: string) => void) => {
    replaceEditorContentRef.current = replaceContent;
  }, []);

  const handleRestoreDraft = () => {
    const draft = loadDraft(storageKey);
    if (draft) {
      setTitle(draft.title);
      setSlug(draft.slug);
      setContent(draft.content);
      setTags(draft.tags);
      setSeriesId(draft.seriesId);
      setState(draft.state);
      setUploadedImageUrls(draft.uploadedImageUrls);
      if (replaceEditorContentRef.current) {
        replaceEditorContentRef.current(draft.content);
      }
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
        const result = await createArticle({ title, slug, content, tags, seriesId, state, uploadedImageUrls });
        clearDraft(storageKey);
        router.push(`/articles/${result.slug}`);
      } else {
        await updateArticle(slug, { title, content, tags, seriesId, state, uploadedImageUrls });
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
      state,
    },
    handlers: {
      setTitle,
      setSlug,
      setContent,
      setSeriesId,
      setState,
      handleAddTag,
      handleRemoveTag,
      handleImageUpload,
      handlePublish,
      handleRestoreDraft,
      handleDiscardDraft,
      handleEditorReady,
    },
    state: {
      isPublishing,
      showRestoreDialog,
    },
  };
}
