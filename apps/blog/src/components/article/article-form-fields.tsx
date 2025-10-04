import { Card, Input, MDXEditor } from '@imkdw-dev/ui';

interface Props {
  title: string;
  slug: string;
  content: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export function ArticleFormFields({ title, slug, content, onTitleChange, onSlugChange, onContentChange }: Props) {
  return (
    <Card className="p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-6">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              제목
            </label>
            <Input
              placeholder="게시글 제목을 입력하세요..."
              value={title}
              onChange={e => onTitleChange(e.target.value)}
              className="text-xl px-0 py-3 sm:py-4 p-2"
            />
          </div>

          <div className="pt-5">
            <label className="text-sm font-semibold text-foreground mb-2.5 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              URL Slug
            </label>
            <Input
              placeholder="url-slug"
              value={slug}
              onChange={e => onSlugChange(e.target.value)}
              className="text-sm text-muted-foreground font-mono"
            />
            <p className="text-xs text-muted-foreground/80 mt-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/50"></span>
              게시글 URL:{' '}
              <code className="px-1.5 py-0.5 bg-muted rounded text-primary">/articles/{slug || 'your-slug'}</code>
            </p>
          </div>
        </div>

        {/* Content Editor */}
        <div className="min-h-[500px] pt-5">
          <label className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            본문
          </label>
          <MDXEditor markdown={content} onChange={onContentChange} placeholder="마크다운으로 글을 작성하세요..." />
        </div>
      </div>
    </Card>
  );
}
