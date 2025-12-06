---
name: Frontend Responsive
description: Implement responsive designs using Tailwind CSS v3 breakpoints and mobile-first development patterns for Next.js applications. Use this skill when creating responsive layouts with Tailwind breakpoint prefixes (sm:, md:, lg:, xl:, 2xl:), implementing mobile-first CSS, building responsive navigation (mobile sidebar, desktop header), creating fluid grid layouts, handling touch-friendly interactions, optimizing images with next/image for different screen sizes, implementing responsive typography, or testing across viewport sizes with Playwright. This includes files in apps/blog/src/components/, packages/ui/src/components/layout/, any component using responsive Tailwind classes, and mobile/desktop navigation components. Apply when building layouts that must adapt across mobile, tablet, and desktop screen sizes.
---

# Frontend Responsive

## When to use this skill:

- When creating responsive layouts with Tailwind breakpoint prefixes (sm:, md:, lg:, xl:, 2xl:)
- When implementing mobile-first CSS patterns
- When building responsive navigation (mobile sidebar vs desktop header)
- When creating fluid grid layouts
- When handling touch-friendly interactions on mobile
- When optimizing images with `next/image` for different screen sizes
- When implementing responsive typography
- When testing across viewport sizes with Playwright MCP
- When working with `packages/ui/src/components/layout/` components
- When building components that must adapt across mobile, tablet, and desktop

## Tailwind Breakpoints

### Default Breakpoints

```typescript
// Tailwind v3 default breakpoints (mobile-first: min-width)
sm: '640px'   // Small devices (landscape phones)
md: '768px'   // Medium devices (tablets)
lg: '1024px'  // Large devices (desktops)
xl: '1280px'  // Extra large devices (large desktops)
2xl: '1536px' // 2X large devices (but container max: 1200px)
```

### Container Configuration

```typescript
// From tailwind-preset.ts
container: {
  center: true,
  padding: '2rem',
  screens: {
    '2xl': '1200px',  // Max container width is 1200px
  },
}
```

## Mobile-First Development

### Pattern

```typescript
// Start with mobile styles, add breakpoint prefixes for larger screens
<div className={cn(
  // Mobile (default)
  'flex flex-col gap-4 p-4',
  // Tablet and up
  'md:flex-row md:gap-6 md:p-6',
  // Desktop and up
  'lg:gap-8 lg:p-8',
)}>
  {/* Content */}
</div>
```

### Common Responsive Patterns

#### Show/Hide Elements

```typescript
// Mobile only
<MobileSidebar className="md:hidden" />

// Desktop only
<DesktopNavigation className="hidden md:flex" />

// Tablet and up
<div className="hidden sm:block">...</div>
```

#### Responsive Grid

```typescript
// 1 column mobile, 2 columns tablet, 3 columns desktop
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {articles.map(article => (
    <ArticleCard key={article.id} article={article} />
  ))}
</div>

// Full width mobile, sidebar layout desktop
<div className="flex flex-col lg:flex-row">
  <main className="flex-1">{/* Content */}</main>
  <aside className="w-full lg:w-80">{/* Sidebar */}</aside>
</div>
```

#### Responsive Typography

```typescript
// Smaller on mobile, larger on desktop
<h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
  Title
</h1>

// Responsive prose
<article className="prose prose-sm sm:prose-base lg:prose-lg">
  {/* Content */}
</article>
```

#### Responsive Spacing

```typescript
// Tighter on mobile, more spacious on desktop
<section className="py-8 sm:py-12 lg:py-16">
  <div className="px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

## Layout Components

### Responsive Header

```typescript
// packages/ui/src/components/layout/header/
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      {/* Mobile: hamburger menu */}
      <MobileNavigation className="md:hidden" />

      {/* Desktop: full navigation */}
      <DesktopNavigation className="hidden md:flex" />
    </header>
  );
}
```

### Responsive Sidebar

```typescript
// Mobile: overlay sidebar with sheet/dialog
// Desktop: persistent sidebar

// packages/ui/src/contexts/sidebar-context.tsx provides toggle
import { useSidebar } from '@imkdw-dev/ui';

export function SidebarContainer({ children }: Props) {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      {/* Mobile overlay */}
      <div className={cn(
        'fixed inset-0 z-40 bg-black/50 md:hidden',
        isOpen ? 'block' : 'hidden'
      )} onClick={toggle} />

      {/* Sidebar */}
      <aside className={cn(
        // Mobile: fixed overlay
        'fixed inset-y-0 left-0 z-50 w-72 transform bg-sidebar transition-transform md:relative md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {children}
      </aside>
    </>
  );
}
```

## Touch-Friendly Design

### Minimum Tap Targets

```typescript
// Minimum 44x44px for touch targets (WCAG 2.1)
<button className="min-h-[44px] min-w-[44px] p-3">
  <Icon />
</button>

// Or use size variants
<Button size="lg">...</Button>  // h-11 = 44px
```

### Touch Interactions

```typescript
// Increase hit areas on mobile
<Link className="block p-4 -m-4 sm:p-2 sm:-m-2">
  {/* Larger tap area on mobile */}
</Link>

// Disable hover effects on touch devices (optional)
<button className="hover:bg-accent active:bg-accent/80">
  {/* active state for touch feedback */}
</button>
```

## Responsive Images

### Using next/image

```typescript
import Image from 'next/image';

// Responsive with automatic srcset
<Image
  src="/article-cover.jpg"
  alt="Article cover"
  width={800}
  height={400}
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
/>

// Fill mode for containers
<div className="relative aspect-video">
  <Image
    src="/article-cover.jpg"
    alt="Article cover"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### Responsive Background Images

```typescript
// Use Tailwind's bg utilities with responsive variants
<div className={cn(
  'bg-cover bg-center',
  'bg-[url("/mobile-hero.jpg")]',
  'md:bg-[url("/desktop-hero.jpg")]'
)}>
  {/* Content */}
</div>
```

## Testing Responsive Designs

### Playwright MCP Integration

As mentioned in `apps/blog/CLAUDE.md`, use Playwright MCP for testing:

```typescript
// Test on http://localhost:3000
// Use browser resize to test different viewports

// Common viewport sizes to test:
// Mobile: 375x667 (iPhone SE)
// Tablet: 768x1024 (iPad)
// Desktop: 1280x720 (HD)
// Large: 1920x1080 (Full HD)
```

### Visual Testing Checklist

- [ ] Navigation works on all viewport sizes
- [ ] Content is readable without horizontal scrolling
- [ ] Touch targets are at least 44x44px on mobile
- [ ] Images scale appropriately
- [ ] Typography is legible on small screens
- [ ] Modals and overlays work on mobile
- [ ] Forms are usable on touch devices

## Common Patterns in This Project

### Article List Responsive Grid

```typescript
// apps/blog/src/components/article/articles-list.tsx pattern
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {articles.map(article => (
    <ArticleCard key={article.id} article={article} />
  ))}
</div>
```

### Series Cards Layout

```typescript
// apps/blog/src/components/series/series-list-grid.tsx pattern
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {series.map(item => (
    <SeriesMainCard key={item.id} series={item} />
  ))}
</div>
```

### Form Layout

```typescript
// Stack on mobile, inline on desktop
<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
  <Input className="flex-1" />
  <Button>Submit</Button>
</div>
```

## Best Practices

### Avoid Fixed Widths

```typescript
// AVOID: Fixed pixel widths break on small screens
<div className="w-[800px]">...</div>

// BETTER: Responsive widths
<div className="w-full max-w-3xl">...</div>
```

### Use Relative Units

```typescript
// GOOD: Relative units scale
<div className="p-4 text-base">...</div>

// Use rem/em for scalability
<div className="text-[1.125rem] leading-relaxed">...</div>
```

### Content Priority

```typescript
// Show most important content first on mobile
<article className="flex flex-col-reverse lg:flex-row">
  {/* Sidebar second on desktop, last on mobile */}
  <aside className="lg:w-80 lg:order-last">...</aside>

  {/* Main content first */}
  <main className="flex-1">...</main>
</article>
```

For detailed best practices, refer to:
[frontend responsive standards](../../../agent-os/standards/frontend/responsive.md)
