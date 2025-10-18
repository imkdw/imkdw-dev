'use client';

import { ArticleFormHeader } from './article-form-header';
import { ArticleFormFields } from './article-form-fields';
import { ArticleTagManager } from './article-tag-manager';
import { ArticleSeriesSelector } from './article-series-selector';
import { ArticleWritingStats } from './article-writing-stats';
import { useArticleForm } from '@imkdw-dev/hooks';
import { IArticleDto } from '@imkdw-dev/types';

interface Props {
  mode: 'create' | 'edit';
  initialData?: IArticleDto;
}

export function ArticleForm({ mode, initialData }: Props) {
  const { formData, handlers } = useArticleForm({ mode, initialData });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <ArticleFormHeader mode={mode} onSaveDraft={handlers.handleSaveDraft} onPublish={handlers.handlePublish} />
      <div className="flex gap-4 flex-1">
        <div className="flex flex-1">
          <ArticleFormFields
            title={formData.title}
            slug={formData.slug}
            content={formData.content}
            onTitleChange={handlers.setTitle}
            onSlugChange={handlers.setSlug}
            onChangeContent={handlers.setContent}
            onUploadImage={handlers.handleImageUpload}
          />
        </div>
        <div className="flex flex-col gap-4 p-2">
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
