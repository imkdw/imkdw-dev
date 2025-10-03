import { Card, Input, Textarea } from '@imkdw-dev/ui';

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
            <Input
              placeholder="게시글 제목을 입력하세요..."
              value={title}
              onChange={e => onTitleChange(e.target.value)}
              className="text-2xl sm:text-3xl font-bold border-none px-0 py-3 sm:py-4 focus-visible:ring-0 placeholder:text-muted-foreground/40 hover:placeholder:text-muted-foreground/60 transition-colors"
            />
          </div>

          <div className="border-t pt-5">
            <label className="text-sm font-semibold text-foreground mb-2.5 block flex items-center gap-2">
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
              게시글 URL: <code className="px-1.5 py-0.5 bg-muted rounded text-primary">/articles/{slug || 'your-slug'}</code>
            </p>
          </div>
        </div>

        {/* Content Editor */}
        <div className="min-h-[500px] border-t pt-5">
          <label className="text-sm font-semibold text-foreground mb-3 block flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            본문
          </label>
          <Textarea
            placeholder="마크다운으로 글을 작성하세요...

# 제목 1
## 제목 2
**굵은 글씨**
*기울임 글씨*
[링크](url)

```javascript
// 코드 블록
console.log('Hello World');
```

> 인용문

- 목록 아이템
- 다른 아이템"
            value={content}
            onChange={e => onContentChange(e.target.value)}
            className="min-h-[500px] resize-none border-none focus-visible:ring-0 text-base leading-relaxed placeholder:text-muted-foreground/50 hover:placeholder:text-muted-foreground/70 transition-colors"
          />
        </div>
      </div>
    </Card>
  );
}
