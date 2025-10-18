import { Input, MilkdownWrapper } from '@imkdw-dev/ui';

interface Props {
  title: string;
  slug: string;
  content: string;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onChangeContent: (value: string) => void;
  onUploadImage: (imageUrl: string) => void;
}

export function ArticleFormFields({
  title,
  slug,
  content,
  onTitleChange,
  onSlugChange,
  onChangeContent,
  onUploadImage,
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

      <div className="flex-1 flex">
        <MilkdownWrapper
          content={content}
          isEditable={true}
          onChangeContent={onChangeContent}
          onUploadImage={onUploadImage}
        />
      </div>
    </div>
  );
}
