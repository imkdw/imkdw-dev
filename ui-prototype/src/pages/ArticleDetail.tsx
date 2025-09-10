import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import TableOfContents from '@/components/article/TableOfContents';
import CodeBlock from '@/components/ui/code-block';
import CommentSection from '@/components/article/CommentSection';
import { Calendar, Clock, Edit, Star, Share2, BookOpen, Code2 } from 'lucide-react';

const ArticleDetail = () => {
  const { slug } = useParams();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  <BookOpen className="w-3 h-3 mr-1" />
                  React Deep Dive
                </Badge>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">Part 3 of 5</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                Understanding React Server Components: A Deep Dive into the Future
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Developer</p>
                    <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Dec 15, 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        12 min read
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    <Star className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">Star</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    <Share2 className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                    <Link to={`/edit/${slug}`}>
                      <Edit className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {['React', 'Server Components', 'Next.js', 'Performance'].map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
              <div className="mb-8">
                <img 
                  src="/placeholder.svg" 
                  alt="Article cover" 
                  className="w-full h-48 sm:h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  React Server Components represent one of the most significant paradigm shifts in React development since hooks. 
                  This article explores the fundamentals, benefits, and practical implementation strategies.
                </p>
                
                <h2 id="what-are-server-components">What are Server Components?</h2>
                <p>
                  Server Components are a new type of React component that runs on the server, allowing you to build 
                  applications that span the server and client. They enable you to move data fetching and expensive 
                  computations to the server, reducing bundle size and improving performance.
                </p>
                
                <h3 id="key-concepts">Key Concepts</h3>
                <p>
                  Understanding the core concepts behind Server Components is essential for effective implementation.
                </p>
                
                <h4 id="rendering-location">Rendering Location</h4>
                <p>
                  Server Components render on the server, while Client Components render on the client.
                </p>
                
                <div className="bg-card border rounded-lg p-6 my-8">
                  <h3 className="text-lg font-semibold mb-3">💡 Key Insight</h3>
                  <p className="text-muted-foreground">
                    Server Components don't replace Client Components—they complement them. Think of them as a way to 
                    optimize parts of your application that don't need interactivity.
                  </p>
                </div>
                
                <h2 id="benefits-of-server-components">Benefits of Server Components</h2>
                <ul>
                  <li><strong>Reduced Bundle Size:</strong> Server Components don't send JavaScript to the client</li>
                  <li><strong>Direct Backend Access:</strong> Fetch data directly without API routes</li>
                  <li><strong>Improved Performance:</strong> Faster initial page loads and better SEO</li>
                  <li><strong>Enhanced Security:</strong> Keep sensitive logic on the server</li>
                </ul>
                
                <h3 id="performance-advantages">Performance Advantages</h3>
                <p>
                  Server Components provide significant performance benefits for your applications.
                </p>
                
                <h4 id="bundle-size-reduction">Bundle Size Reduction</h4>
                <p>
                  By rendering on the server, these components don't contribute to your JavaScript bundle.
                </p>
                
                <h4 id="initial-load-speed">Initial Load Speed</h4>
                <p>
                  Faster Time to First Byte (TTFB) and improved Core Web Vitals scores.
                </p>
                
                <CodeBlock 
                  language="javascript" 
                  filename="BlogPost.jsx"
                >
{`// Example Server Component
async function BlogPost({ id }) {
  // This runs on the server
  const post = await db.post.findUnique({
    where: { id },
    include: { author: true, comments: true }
  });
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author.name}</p>
      <div>{post.content}</div>
      <Comments comments={post.comments} />
    </article>
  );
}`}
                </CodeBlock>
                
                <h2 id="implementation-strategies">Implementation Strategies</h2>
                <p>
                  When implementing Server Components, consider the following patterns and best practices 
                  to maximize their effectiveness in your application architecture.
                </p>
                
                <h3 id="data-fetching-patterns">Data Fetching Patterns</h3>
                <p>
                  Learn how to effectively fetch data in Server Components using various patterns.
                </p>
                
                <CodeBlock language="typescript" filename="user.server.tsx">
{`import { User } from '@/types/user';

export async function getUserProfile(userId: string): Promise<User> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      posts: true,
      followers: true,
      following: true,
    },
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
}`}
                </CodeBlock>
                
                <h4 id="direct-database-access">Direct Database Access</h4>
                <p>
                  Server Components can directly access your database without API routes.
                </p>
                
                <h4 id="caching-strategies">Caching Strategies</h4>
                <p>
                  Implement effective caching to optimize data fetching performance.
                </p>
                
                <CodeBlock language="javascript" filename="cache-example.js">
{`// Using React's cache function
import { cache } from 'react';

export const getPost = cache(async (id) => {
  const post = await fetch(\`/api/posts/\${id}\`);
  return post.json();
});

// Revalidation with Next.js
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}`}
                </CodeBlock>
                
                <h3 id="component-composition">Component Composition</h3>
                <p>
                  Best practices for composing Server and Client Components together.
                </p>
              </div>
            </article>

            {/* Related Articles */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-6">관련 글</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-card/50 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium mb-1">React 18의 새로운 기능들</h4>
                    <p className="text-sm text-muted-foreground mb-2">Concurrent Features와 Suspense를 활용한 성능 최적화</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>2024.01.15</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>8분</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg hover:bg-card/50 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium mb-1">TypeScript 고급 타입 활용법</h4>
                    <p className="text-sm text-muted-foreground mb-2">Utility Types와 Conditional Types로 더 안전한 코드 작성하기</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>2024.01.10</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>12분</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 border rounded-lg hover:bg-card/50 transition-colors">
                <p className="text-sm text-muted-foreground mb-2">Previous Article</p>
                <h3 className="font-medium">React 18 Concurrent Features</h3>
              </div>
              <div className="p-6 border rounded-lg hover:bg-card/50 transition-colors">
                <p className="text-sm text-muted-foreground mb-2">Next Article</p>
                <h3 className="font-medium">Building Performant React Apps</h3>
              </div>
            </div>

            {/* Comments Section */}
            <CommentSection articleId={slug || ''} />
          </div>
          
          {/* Table of Contents - Right Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <TableOfContents />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticleDetail;