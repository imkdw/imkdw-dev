import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@imkdw-dev/actions';

interface UseArticleFormParams {
  mode: 'create' | 'edit';
  initialData?: {
    title: string;
    slug: string;
    content: string;
    tags: string[];
  };
}

export function useArticleForm({ mode, initialData }: UseArticleFormParams) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => setTags(tags.filter(tag => tag !== tagToRemove));

  const handleSaveDraft = () => {};

  const handlePublish = async () => {
    if (isPublishing) {
      return;
    }

    setIsPublishing(true);

    try {
      const result = await createArticle({
        title,
        slug,
        content,
        tags,
        seriesId: '',
      });

      router.push(`/articles/${result.slug}`);
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
    },
    handlers: {
      setTitle,
      setSlug,
      setContent,
      handleAddTag,
      handleRemoveTag,
      handlePublish,
      handleSaveDraft,
    },
    state: {
      isPublishing,
    },
  };
}
