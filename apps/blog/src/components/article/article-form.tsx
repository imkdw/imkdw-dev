'use client';

import { useState } from 'react';
import { ArticleFormHeader } from './article-form-header';
import { ArticleFormFields } from './article-form-fields';
import { ArticleTagManager } from './article-tag-manager';
import { ArticleWritingStats } from './article-writing-stats';

interface Props {
  mode: 'create' | 'edit';
  initialData?: {
    title: string;
    slug: string;
    content: string;
    tags: string[];
  };
}

export function ArticleForm({ mode, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);

  const handleTitleChange = (value: string) => setTitle(value);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => setTags(tags.filter(tag => tag !== tagToRemove));

  const handleSaveDraft = () => {};

  const handlePublish = () => {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ArticleFormHeader mode={mode} onSaveDraft={handleSaveDraft} onPublish={handlePublish} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <ArticleFormFields
            title={title}
            slug={slug}
            content={content}
            onTitleChange={handleTitleChange}
            onSlugChange={setSlug}
            onContentChange={setContent}
          />
        </div>

        {/* Sidebar */}
        <div className="order-1 lg:order-2 space-y-4 lg:space-y-6">
          <ArticleTagManager tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
          <ArticleWritingStats content={content} />
        </div>
      </div>
    </div>
  );
}
