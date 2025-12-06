---
name: Frontend Components
description: Build and structure React components following the project's design system patterns with Next.js 16 App Router, React 19, and TypeScript. Use this skill when creating or modifying React components (*.tsx), implementing component variants with class-variance-authority (CVA), using the cn() utility for class merging, building reusable primitives (Button, Card, Input, Badge, Dialog, etc.), composing complex components from primitives, implementing Server Components vs Client Components, using the 'use client' directive, working with component props and TypeScript interfaces, or extending existing UI package components. This includes files in apps/blog/src/components/, packages/ui/src/primitives/, packages/ui/src/components/, and any file importing from @imkdw-dev/ui. Apply when creating new components, refactoring existing ones, or deciding between primitives and complex components.
---

# Frontend Components

## When to use this skill:

- When creating or modifying React components (\*.tsx files)
- When implementing component variants with class-variance-authority (CVA)
- When using the `cn()` utility for conditional class merging
- When building reusable primitives (Button, Card, Input, Badge, Dialog, Select, etc.)
- When composing complex components from primitives
- When deciding between Server Components and Client Components
- When adding the `'use client'` directive
- When defining component props with TypeScript interfaces
- When extending or customizing UI package components
- When working with files in `packages/ui/src/primitives/` or `apps/blog/src/components/`
- When importing components from `@imkdw-dev/ui`

## Component Architecture

### Directory Structure

```
packages/ui/src/
├── primitives/          # Basic UI elements (Button, Card, Input, etc.)
├── components/          # Complex components with business logic
│   ├── auth/           # Authentication (login-modal, user-menu)
│   ├── cards/          # Card variants (article-card, series-card)
│   ├── layout/         # Layout components (header, footer, sidebar)
│   ├── editor/         # Milkdown editor integration
│   └── terminal/       # Terminal-themed components
├── lib/                # Utilities (cn function)
├── tokens/             # Design tokens and Tailwind preset
└── contexts/           # React contexts (sidebar-context)

apps/blog/src/components/
├── article/            # Article-related components
├── series/             # Series-related components
├── comment/            # Comment system components
├── common/             # Shared components
├── sections/           # Page sections
└── sidebar/            # Sidebar components
```

### Component Definition Pattern

```typescript
// ALWAYS use function keyword, NOT arrow functions
// ALWAYS name props interface as "Props"

interface Props {
  title: string;
  variant?: 'default' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

export function MyComponent({ title, variant = 'default', className, children }: Props) {
  return (
    <div className={cn('base-styles', className)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Server vs Client Components

```typescript
// Server Component (default in Next.js App Router)
// Can fetch data, access server-only resources
// Cannot use hooks, event handlers, or browser APIs
export function ArticleList() {
  // Can use async/await directly
  const articles = await fetchArticles();
  return <div>{/* render */}</div>;
}

// Client Component (add 'use client' directive)
// Required for: hooks, event handlers, browser APIs, state
'use client';

import { useState } from 'react';

export function ArticleForm() {
  const [title, setTitle] = useState('');
  return <input onChange={(e) => setTitle(e.target.value)} />;
}
```

## Component Variants with CVA

### Defining Variants

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@imkdw-dev/ui/lib';

const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, ...props }: Props) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
```

## Class Merging with cn()

```typescript
import { cn } from '@imkdw-dev/ui/lib';

// Basic usage
<div className={cn('base-class', 'additional-class')} />

// Conditional classes
<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  isDisabled && 'disabled-styles',
  className // Always pass through className prop last
)} />

// With CVA variants
<button className={cn(buttonVariants({ variant, size }), className)} />
```

## Component Composition

### Primitives vs Complex Components

```typescript
// Primitive: Single responsibility, highly reusable
// packages/ui/src/primitives/card.tsx
export function Card({ className, children }: Props) {
  return (
    <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
      {children}
    </div>
  );
}

// Complex: Composed from primitives, includes business logic
// packages/ui/src/components/cards/article-card.tsx
import { Card } from '../../primitives/card';
import { Badge } from '../../primitives/badge';

export function ArticleCard({ article }: Props) {
  return (
    <Card className="p-6">
      <Badge variant="secondary">{article.category}</Badge>
      <h3>{article.title}</h3>
      {/* More composed content */}
    </Card>
  );
}
```

### Export Pattern

```typescript
// Each folder has index.ts for barrel exports
// packages/ui/src/primitives/index.ts
export * from './button';
export * from './card';
export * from './badge';

// Main package export
// packages/ui/src/index.ts
export * from './primitives';
export * from './components';
export * from './lib';
```

## Best Practices

### Props Interface Naming

```typescript
// ALWAYS use "Props" as the interface name
interface Props {
  // props definition
}

// NOT these:
interface ButtonProps {} // Wrong
interface IButtonProps {} // Wrong
type ButtonPropsType = {}; // Wrong
```

### Component Naming

```typescript
// Use PascalCase for components
export function ArticleCard() {}
export function DeleteConfirmDialog() {}

// File naming: kebab-case
// article-card.tsx
// delete-confirm-dialog.tsx
```

### Importing UI Components

```typescript
// Import from @imkdw-dev/ui
import { Button, Card, Badge } from '@imkdw-dev/ui';

// Import utilities
import { cn } from '@imkdw-dev/ui/lib';

// Import specific primitives (if needed)
import { buttonVariants } from '@imkdw-dev/ui/primitives';
```

### Adding New Shared Components

1. If reusable across apps: Add to `packages/ui/src/primitives/` or `packages/ui/src/components/`
2. If app-specific: Add to `apps/blog/src/components/`
3. Always export from the appropriate `index.ts`
4. Update `packages/ui/src/index.ts` if adding to UI package

For detailed best practices, refer to:
[frontend components standards](../../../agent-os/standards/frontend/components.md)
