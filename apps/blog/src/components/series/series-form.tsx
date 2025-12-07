'use client';

import { SeriesFormHeader } from './series-form-header';
import { SeriesFormFields } from './series-form-fields';
import { ArticleTagManager } from '../article/article-tag-manager';
import { useSeriesForm } from '@/hooks';
import { ISeriesDetailDto } from '@imkdw-dev/types';

interface Props {
  mode: 'create' | 'edit';
  initialData?: ISeriesDetailDto;
}

export function SeriesForm({ mode, initialData }: Props) {
  const { formData, handlers } = useSeriesForm({ mode, initialData });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <SeriesFormHeader mode={mode} onSaveDraft={handlers.handleSaveDraft} onPublish={handlers.handlePublish} />
      <div className="flex gap-4 flex-1">
        <div className="flex flex-1">
          <SeriesFormFields
            title={formData.title}
            slug={formData.slug}
            description={formData.description}
            onTitleChange={handlers.setTitle}
            onSlugChange={handlers.setSlug}
            onDescriptionChange={handlers.setDescription}
          />
        </div>
        <div className="flex flex-col gap-4 p-2">
          <ArticleTagManager
            tags={formData.tags}
            onAddTag={handlers.handleAddTag}
            onRemoveTag={handlers.handleRemoveTag}
          />
        </div>
      </div>
    </div>
  );
}
