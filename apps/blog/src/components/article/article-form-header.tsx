import { Button } from '@imkdw-dev/ui';
import { Send } from 'lucide-react';

interface Props {
  mode: 'create' | 'edit';
  onPublish: () => void;
}

export function ArticleFormHeader({ mode, onPublish }: Props) {
  const title = mode === 'create' ? '게시글 작성' : '게시글 수정';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:mb-8 pb-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <Button className="flex items-center gap-2 flex-1 sm:flex-initial" onClick={onPublish}>
          <Send className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </div>
  );
}
