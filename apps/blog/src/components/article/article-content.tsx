import { ReactNode } from 'react';

interface CodeBlockProps {
  filename: string;
  children: string;
}

function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <div className="bg-card border rounded-lg p-4 my-6">
      <div className="text-sm text-muted-foreground mb-2">{filename}</div>
      <pre className="text-sm overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

interface ArticleContentProps {
  content: ReactNode;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
      {content}
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          React Server Components represent one of the most significant paradigm shifts in React development since
          hooks. This article explores the fundamentals, benefits, and practical implementation strategies.
        </p>

        <h2 id="what-are-server-components">What are Server Components?</h2>
        <p>
          Server Components are a new type of React component that runs on the server, allowing you to build
          applications that span the server and client. They enable you to move data fetching and expensive computations
          to the server, reducing bundle size and improving performance.
        </p>

        <h3 id="key-concepts">Key Concepts</h3>
        <p>Understanding the core concepts behind Server Components is essential for effective implementation.</p>

        <h4 id="rendering-location">Rendering Location</h4>
        <p>Server Components render on the server, while Client Components render on the client.</p>

        <div className="bg-card border rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold mb-3">💡 Key Insight</h3>
          <p className="text-muted-foreground">
            Server Components don&apos;t replace Client Components—they complement them. Think of them as a way to
            optimize parts of your application that don&apos;t need interactivity.
          </p>
        </div>

        <h2 id="benefits-of-server-components">Benefits of Server Components</h2>
        <ul>
          <li>
            <strong>Reduced Bundle Size:</strong> Server Components don&apos;t send JavaScript to the client
          </li>
          <li>
            <strong>Direct Backend Access:</strong> Fetch data directly without API routes
          </li>
          <li>
            <strong>Improved Performance:</strong> Faster initial page loads and better SEO
          </li>
          <li>
            <strong>Enhanced Security:</strong> Keep sensitive logic on the server
          </li>
        </ul>

        <h3 id="performance-advantages">Performance Advantages</h3>
        <p>Server Components provide significant performance benefits for your applications.</p>

        <h4 id="bundle-size-reduction">Bundle Size Reduction</h4>
        <p>By rendering on the server, these components don&apos;t contribute to your JavaScript bundle.</p>

        <h4 id="initial-load-speed">Initial Load Speed</h4>
        <p>Faster Time to First Byte (TTFB) and improved Core Web Vitals scores.</p>

        <CodeBlock filename="BlogPost.jsx">
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
          When implementing Server Components, consider the following patterns and best practices to maximize their
          effectiveness in your application architecture.
        </p>

        <h3 id="data-fetching-patterns">Data Fetching Patterns</h3>
        <p>Learn how to effectively fetch data in Server Components using various patterns.</p>

        <CodeBlock filename="user.server.tsx">
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
        <p>Server Components can directly access your database without API routes.</p>

        <h4 id="caching-strategies">Caching Strategies</h4>
        <p>Implement effective caching to optimize data fetching performance.</p>

        <CodeBlock filename="cache-example.js">
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
        <p>Best practices for composing Server and Client Components together.</p>
      </div>
    </article>
  );
}

export { CodeBlock };
