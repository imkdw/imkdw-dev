import { useState } from 'react';
import { createArticleComment } from '@imkdw-dev/api-client';

interface Props {
  onSuccess: () => void;
}

export function useCommentForm({ onSuccess }: Props) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (articleSlug: string) => {
    if (isSubmitting || !content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createArticleComment(articleSlug, { content });
      setContent('');
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    content,
    setContent,
    isSubmitting,
    handleSubmit,
  };
}
