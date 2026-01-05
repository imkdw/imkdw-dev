'use client';

import { ArticleFormHeader } from './article-form-header';
import { ArticleFormFields } from './article-form-fields';
import { ArticleTagManager } from './article-tag-manager';
import { ArticleSeriesSelector } from './article-series-selector';
import { ArticleVisibilitySelector } from './article-visibility-selector';
import { ArticleWritingStats } from './article-writing-stats';
import { DraftRestoreDialog } from '../common/draft-restore-dialog';
import { useArticleForm } from '@/hooks';
import { IArticleDto } from '@imkdw-dev/types';
import { ArticleFormMode } from '@/types/article';

interface Props {
  mode: ArticleFormMode;
  initialData?: IArticleDto;
}

export function ArticleForm({ mode, initialData }: Props) {
  const { formData, handlers, state } = useArticleForm({ mode, initialData });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <ArticleFormHeader mode={mode} onPublish={handlers.handlePublish} />
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
            onEditorReady={handlers.handleEditorReady}
          />
        </div>
        <div className="flex flex-col gap-4 p-2">
          <ArticleSeriesSelector value={formData.seriesId} onValueChange={handlers.setSeriesId} />
          <ArticleVisibilitySelector value={formData.state} onValueChange={handlers.setState} />
          <ArticleTagManager
            tags={formData.tags}
            onAddTag={handlers.handleAddTag}
            onRemoveTag={handlers.handleRemoveTag}
          />
          <ArticleWritingStats content={formData.content} />
        </div>
      </div>

      <DraftRestoreDialog
        open={state.showRestoreDialog}
        onRestore={handlers.handleRestoreDraft}
        onDiscard={handlers.handleDiscardDraft}
      />
    </div>
  );
}
