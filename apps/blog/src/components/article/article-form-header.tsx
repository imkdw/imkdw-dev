import { Button } from '@imkdw-dev/ui';
import { Save, Send } from 'lucide-react';

interface Props {
  mode: 'create' | 'edit';
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function ArticleFormHeader({ mode, onSaveDraft, onPublish }: Props) {
  const title = mode === 'create' ? '게시글 작성' : '게시글 수정';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8 pb-6 border-b">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-initial" onClick={onSaveDraft}>
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save Draft</span>
          <span className="sm:hidden">Draft</span>
        </Button>
        <Button className="flex items-center gap-2 flex-1 sm:flex-initial" onClick={onPublish}>
          <Send className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </div>
  );
}
