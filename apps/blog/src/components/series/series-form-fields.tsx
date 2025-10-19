import { Input, Textarea } from '@imkdw-dev/ui';

interface Props {
  title: string;
  slug: string;
  description: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function SeriesFormFields({
  title,
  slug,
  description,
  onTitleChange,
  onSlugChange,
  onDescriptionChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="border-b border-border/50 py-2">
        <Input
          placeholder="제목"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          className="text-3xl px-0 py-2 border-none bg-transparent focus:outline-none placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="border-b border-border/50 py-2">
        <Input
          placeholder="URL Slug"
          value={slug}
          onChange={e => onSlugChange(e.target.value)}
          className="text-xl p-1 border-none bg-transparent focus:outline-none placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="flex-1">
        <Textarea
          placeholder="시리즈 설명을 입력하세요..."
          value={description}
          onChange={e => onDescriptionChange(e.target.value)}
          className="w-full h-full min-h-[100px] resize-none text-base border border-border"
        />
      </div>
    </div>
  );
}
