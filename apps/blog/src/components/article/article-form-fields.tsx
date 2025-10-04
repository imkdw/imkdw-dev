import { Input, MDXEditor } from '@imkdw-dev/ui';

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
    <div className="space-y-0 flex flex-col gap-4">
      <div className="border-b border-border/30 py-2">
        <Input
          placeholder="제목"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          className="text-3xl px-0 py-2 border-none bg-transparent focus:outline-none placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="border-b border-border/30 py-2">
        <Input
          placeholder="URL Slug"
          value={slug}
          onChange={e => onSlugChange(e.target.value)}
          className="text-xl p-1 border-none bg-transparent focus:outline-none placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="flex-1">
        <div className="h-[700px] border border-border/50 rounded-lg overflow-hidden bg-secondary/30 p-2">
          <div className="w-full h-full flex flex-col">
            <MDXEditor markdown={content} onChange={onContentChange} className="w-full h-full flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
