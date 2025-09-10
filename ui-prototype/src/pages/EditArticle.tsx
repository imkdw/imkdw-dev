import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Plus,
  AlertCircle
} from 'lucide-react';

const EditArticle = () => {
  const { slug } = useParams();
  
  // Pre-populated with existing article data
  const [title, setTitle] = useState('React Server Components 완벽 가이드');
  const [currentSlug, setCurrentSlug] = useState('react-server-components-guide');
  const [content, setContent] = useState(`React Server Components는 React 개발에서 훅(Hooks) 이후 가장 중요한 패러다임 변화를 나타냅니다. 이 글에서는 기본 개념, 장점, 그리고 실제 구현 전략을 살펴보겠습니다.

## Server Components란?

Server Components는 서버에서 실행되는 새로운 유형의 React 컴포넌트로, 서버와 클라이언트에 걸친 애플리케이션을 구축할 수 있게 해줍니다. 데이터 페칭과 비용이 많이 드는 계산을 서버로 이동시켜 번들 크기를 줄이고 성능을 향상시킬 수 있습니다.

### 주요 장점

- **번들 크기 감소:** Server Components는 클라이언트에 JavaScript를 보내지 않음
- **직접적인 백엔드 접근:** API 라우트 없이 직접 데이터 페칭
- **향상된 성능:** 빠른 초기 페이지 로드와 더 나은 SEO
- **강화된 보안:** 민감한 로직을 서버에 유지

## 구현 예제

\`\`\`javascript
// Server Component 예제
async function BlogPost({ id }) {
  // 이 코드는 서버에서 실행됩니다
  const post = await db.post.findUnique({
    where: { id },
    include: { author: true, comments: true }
  });
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>작성자: {post.author.name}</p>
      <div>{post.content}</div>
      <Comments comments={post.comments} />
    </article>
  );
}
\`\`\`

이러한 접근 방식은 더 효율적인 데이터 페칭과 더 나은 성능 특성을 가능하게 합니다.`);
  
  const [tags, setTags] = useState<string[]>(['React', 'Server Components', 'Next.js', '성능최적화']);
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
    setCurrentSlug(autoSlug);
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
          <div>
            <h1 className="text-3xl font-bold">게시글 수정</h1>
            <p className="text-muted-foreground">수정 중: {slug}</p>
          </div>
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
              변경사항 저장
            </Button>
            <Button className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              수정 완료
            </Button>
          </div>
        </div>

        {/* Changes Alert */}
        <div className="mb-6">
          <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm">
                저장되지 않은 변경사항이 있습니다. 페이지를 떠나기 전에 작업을 저장하세요.
              </p>
            </div>
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
                        value={currentSlug}
                        onChange={(e) => setCurrentSlug(e.target.value)}
                        className="text-sm text-muted-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        게시글 URL: /articles/{currentSlug || 'your-slug'}
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
                      placeholder="마크다운으로 글을 수정하세요..."
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
                      {title}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-4">
                      URL: /articles/{currentSlug}
                    </p>
                  </div>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap">
                      {content}
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

            {/* Publishing Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">게시글 통계</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">게시일:</span>
                  <span>2024.12.15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">최종 수정:</span>
                  <span>2시간 전</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">조회수:</span>
                  <span className="font-mono">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">단어 수:</span>
                  <span className="font-mono">{content.split(/\s+/).filter(Boolean).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">읽기 시간:</span>
                  <span className="font-mono">
                    {Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))}분
                  </span>
                </div>
              </div>
            </Card>

            {/* Version History */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">최근 변경사항</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">코드 예제 업데이트</p>
                    <p className="text-muted-foreground text-xs">2시간 전</p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">소개 부분 오타 수정</p>
                    <p className="text-muted-foreground text-xs">1일 전</p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">최초 게시</p>
                    <p className="text-muted-foreground text-xs">3일 전</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditArticle;