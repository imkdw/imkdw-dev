'use client';

import { ArticleFormHeader } from './article-form-header';
import { ArticleFormFields } from './article-form-fields';
import { ArticleTagManager } from './article-tag-manager';
import { ArticleSeriesSelector } from './article-series-selector';
import { ArticleWritingStats } from './article-writing-stats';
import { useArticleForm } from '@imkdw-dev/hooks';

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
  const { formData, handlers } = useArticleForm({ mode, initialData });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ArticleFormHeader mode={mode} onSaveDraft={handlers.handleSaveDraft} onPublish={handlers.handlePublish} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <ArticleFormFields
            title={formData.title}
            slug={formData.slug}
            content={formData.content}
            onTitleChange={handlers.setTitle}
            onSlugChange={handlers.setSlug}
            onContentChange={handlers.setContent}
          />
        </div>

        {/* Sidebar */}
        <div className="order-1 lg:order-2 space-y-4 lg:space-y-6">
          <ArticleSeriesSelector value={formData.seriesId} onValueChange={handlers.setSeriesId} />
          <ArticleTagManager
            tags={formData.tags}
            onAddTag={handlers.handleAddTag}
            onRemoveTag={handlers.handleRemoveTag}
          />
          <ArticleWritingStats content={formData.content} />
        </div>
      </div>
    </div>
  );
}
