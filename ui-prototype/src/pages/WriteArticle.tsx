import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bold, 
  Italic, 
  Link, 
  Image, 
  Code, 
  List, 
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Save,
  Send,
  X,
  Plus
} from 'lucide-react';

const WriteArticle = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    const autoSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    setSlug(autoSlug);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => {} },
    { icon: Italic, label: 'Italic', action: () => {} },
    { icon: Link, label: 'Link', action: () => {} },
    { icon: Image, label: 'Image', action: () => {} },
    { icon: Code, label: 'Code', action: () => {} },
    { icon: List, label: 'Bullet List', action: () => {} },
    { icon: ListOrdered, label: 'Numbered List', action: () => {} },
    { icon: Quote, label: 'Quote', action: () => {} },
    { icon: Heading1, label: 'Heading 1', action: () => {} },
    { icon: Heading2, label: 'Heading 2', action: () => {} },
    { icon: Heading3, label: 'Heading 3', action: () => {} },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Write New Article</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {!isPreviewMode ? (
                <div className="space-y-6">
                  {/* Title Input */}
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="게시글 제목을 입력하세요..."
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="text-3xl font-bold border-none px-0 py-4 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                      />
                    </div>
                    
                    {/* Slug Input */}
                    <div className="border-t pt-4">
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">
                        URL Slug
                      </label>
                      <Input
                        placeholder="url-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="text-sm text-muted-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        게시글 URL: /articles/{slug || 'your-slug'}
                      </p>
                    </div>
                  </div>

                  {/* Toolbar */}
                  <div className="flex items-center gap-1 p-3 border rounded-lg bg-card/50">
                    {toolbarButtons.map((button, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        onClick={button.action}
                        className="h-8 w-8 p-0"
                        title={button.label}
                      >
                        <button.icon className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>

                  {/* Content Editor */}
                  <div className="min-h-[500px]">
                    <textarea
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
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full min-h-[500px] resize-none border-none focus:outline-none text-base leading-relaxed bg-transparent placeholder:text-muted-foreground/70"
                    />
                  </div>
                </div>
              ) : (
                /* Preview Mode */
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {title || '게시글 제목...'}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-4">
                      URL: /articles/{slug || 'your-slug'}
                    </p>
                  </div>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap">
                      {content || '게시글 내용을 작성해주세요...'}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article Settings */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">게시글 설정</h3>
              
              <div className="space-y-4">
                {/* Tags */}
                <div>
                  <label className="text-sm font-medium mb-2 block">태그</label>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="태그 추가..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={addTag} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Writing Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">작성 통계</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">글자 수:</span>
                  <span className="font-mono">{content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">단어 수:</span>
                  <span className="font-mono">{content.split(/\s+/).filter(Boolean).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">예상 읽기 시간:</span>
                  <span className="font-mono">
                    {Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))}분
                  </span>
                </div>
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">💡 작성 팁</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 주요 키워드가 포함된 설명적인 제목 사용</p>
                <p>• 가독성을 위해 긴 문단을 나누어 작성</p>
                <p>• 기술적 개념 설명 시 코드 예제 포함</p>
                <p>• 다른 사람이 찾을 수 있도록 관련 태그 추가</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WriteArticle;