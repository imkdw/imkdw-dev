import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSeries, updateSeries } from '@imkdw-dev/api-client';
import { ISeriesDetailDto } from '@imkdw-dev/types';

interface UseSeriesFormParams {
  mode: 'create' | 'edit';
  initialData?: ISeriesDetailDto;
}

export function useSeriesForm({ mode, initialData }: UseSeriesFormParams) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [tags, setTags] = useState<string[]>(initialData?.tags.map(tag => tag.name) ?? []);
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
      if (mode === 'create') {
        const result = await createSeries({ title, slug, description, tags });
        router.push(`/series/${result.slug}`);
      } else if (initialData?.slug) {
        await updateSeries(initialData.slug, { title, description, tags });
        router.push(`/series/${slug}`);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    formData: {
      title,
      slug,
      description,
      tags,
    },
    handlers: {
      setTitle,
      setSlug,
      setDescription,
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
