import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle, updateArticle } from '@imkdw-dev/actions';
import { IArticleDto } from '@imkdw-dev/types';

interface UseArticleFormParams {
  mode: 'create' | 'edit';
  initialData?: IArticleDto;
}

export function useArticleForm({ mode, initialData }: UseArticleFormParams) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [tags, setTags] = useState<string[]>(initialData?.tags.map(tag => tag.name) ?? []);
  const [seriesId, setSeriesId] = useState(initialData?.series?.id ?? '');
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => setTags(tags.filter(tag => tag !== tagToRemove));

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImageUrls(prev => [...prev, imageUrl]);
  };

  const handleSaveDraft = () => {};

  const handlePublish = async () => {
    if (isPublishing) {
      return;
    }

    setIsPublishing(true);

    try {
      if (mode === 'create') {
        const result = await createArticle({ title, slug, content, tags, seriesId, uploadedImageUrls });
        router.push(`/articles/${result.slug}`);
      } else {
        await updateArticle(slug, { title, content, tags, seriesId, uploadedImageUrls });
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
      handleSaveDraft,
    },
    state: {
      isPublishing,
    },
  };
}
