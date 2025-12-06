---
name: Frontend CSS
description: Write Tailwind CSS v3 styles following the project's design system with custom preset, CSS variables, and terminal-themed design tokens. Use this skill when styling React components with Tailwind utility classes, using the custom Tailwind preset from @imkdw-dev/ui, working with CSS variables for theming (--background, --foreground, --primary, etc.), implementing dark mode with the .dark class, applying terminal or code syntax colors, using custom animations (fade-in, slide-up, terminal-blink), working with the @tailwindcss/typography plugin for prose content, or configuring Tailwind in tailwind.config.ts. This includes files in packages/ui/src/tokens/, packages/ui/src/styles/, any *.tsx file with className attributes, and tailwind.config.ts. Apply when adding styles to components, customizing the design system, or troubleshooting Tailwind class conflicts.
---

# Frontend CSS

## When to use this skill:

- When styling React components with Tailwind CSS utility classes
- When using the custom Tailwind preset from `@imkdw-dev/ui/tailwind-preset`
- When working with CSS variables for theming (--background, --foreground, --primary, etc.)
- When implementing dark mode with the `.dark` class
- When applying terminal or code syntax colors
- When using custom animations (fade-in, slide-up, terminal-blink)
- When working with the `@tailwindcss/typography` plugin for prose content
- When configuring `tailwind.config.ts`
- When modifying design tokens in `packages/ui/src/tokens/`
- When troubleshooting Tailwind class conflicts with `cn()` utility

## Tailwind Configuration

### Using the Preset

```typescript
// apps/blog/tailwind.config.ts
import type { Config } from 'tailwindcss';
import { tailwindPreset } from '@imkdw-dev/ui/tailwind-preset';

const config: Config = {
  presets: [tailwindPreset],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
```

## Design Tokens and Colors

### Semantic Color System

The project uses CSS variables for semantic colors that adapt to light/dark mode:

```typescript
// Available color tokens (use with Tailwind classes)
bg - background; // Main background
bg - foreground; // Main text color as background
bg - card; // Card backgrounds
bg - primary; // Primary action color
bg - secondary; // Secondary backgrounds
bg - muted; // Muted/subtle backgrounds
bg - accent; // Accent highlights
bg - destructive; // Error/danger states
bg - popover; // Popover/dropdown backgrounds

text - foreground; // Main text
text - muted - foreground; // Subtle/secondary text
text - primary; // Primary colored text
text - destructive; // Error text

border - border; // Default borders
border - input; // Form input borders
ring - ring; // Focus ring color
```

### Terminal Theme Colors

```typescript
// Terminal-specific colors
bg - terminal - bg; // Terminal background
text - terminal - foreground; // Terminal text (green)
text - terminal - accent; // Terminal accent (cyan)
text - terminal - warning; // Warning (yellow)
text - terminal - error; // Error (red)
text - terminal - success; // Success (green)
text - terminal - info; // Info (cyan)
```

### Code Syntax Colors

```typescript
// Code highlighting colors
bg - code - bg; // Code block background
text - code - foreground; // Code text
text - code - keyword; // Keywords (cyan)
text - code - string; // Strings (green)
text - code - comment; // Comments (gray)
text - code - number; // Numbers (yellow)
text -
  code -
  // Or use utility classes
  operator.syntax - // Operators (red)
  keyword.syntax - // hsl(var(--code-keyword))
  string.syntax - // hsl(var(--code-string))
  comment.syntax - // hsl(var(--code-comment))
  number.syntax - // hsl(var(--code-number))
  operator; // hsl(var(--code-operator))
```

### Sidebar Colors

```typescript
bg - sidebar; // Sidebar background
text - sidebar - foreground; // Sidebar text
bg - sidebar - accent; // Sidebar accent background
text - sidebar - primary; // Sidebar primary text
border - sidebar - border; // Sidebar borders
```

## Dark Mode

### Implementation

```typescript
// Dark mode is class-based (configured in preset)
// darkMode: ['class']

// Toggle with .dark class on html/body element
// Managed by next-themes package

// Automatic color adaptation
<div className="bg-background text-foreground">
  {/* Colors automatically adapt to light/dark mode */}
</div>

// Manual dark mode variants (when needed)
<div className="bg-white dark:bg-gray-900">
  {/* Explicit light/dark styles */}
</div>
```

### Color Variables Location

```typescript
// packages/ui/src/tokens/colors.ts - Color definitions
export const colors = {
  light: {
    background: { primary: '210 11% 96%', ... },
    foreground: { primary: '220 13% 18%', ... },
    // ...
  },
  dark: {
    background: { primary: '220 13% 18%', ... },
    foreground: { primary: '142 76% 36%', ... },
    // ...
  },
};

// packages/ui/src/tokens/tailwind-preset.ts - CSS variable injection
// Variables are set in :root and .dark selectors
```

## Custom Animations

### Available Animations

```typescript
// Use with animate-* class
animate-fade-in       // Fade in with slight upward movement
animate-slide-up      // Slide up with fade
animate-scale-in      // Scale in with fade
animate-shimmer       // Loading shimmer effect
animate-float         // Floating/hovering effect
animate-terminal-blink // Terminal cursor blink
```

### Animation Usage

```typescript
<div className="animate-fade-in">
  {/* Fades in on mount */}
</div>

<div className="animate-terminal-blink">
  {/* Blinking cursor effect */}
</div>

// Smooth transitions utility
<button className="smooth-transition hover:scale-105">
  {/* Uses cubic-bezier(0.4, 0, 0.2, 1) */}
</button>
```

## Terminal UI Utilities

### Pre-built Terminal Classes

```typescript
// Terminal window container
<div className="terminal-window">
  <div className="terminal-header">
    <div className="control-dot close" />
    <div className="control-dot minimize" />
    <div className="control-dot maximize" />
  </div>
  <div className="terminal-content">
    <div className="terminal-prompt">
      <span className="prompt-symbol">$</span>
      <span className="prompt-path">~/project</span>
    </div>
  </div>
</div>
```

### Line Clamp Utilities

```typescript
<p className="line-clamp-2">
  {/* Truncates text to 2 lines with ellipsis */}
</p>

<p className="line-clamp-3">
  {/* Truncates text to 3 lines with ellipsis */}
</p>
```

## Typography Plugin

### Prose Styling

```typescript
// Use @tailwindcss/typography for rich text content
<article className="prose dark:prose-invert">
  {/* Markdown/rich content automatically styled */}
  <h1>Article Title</h1>
  <p>Content with proper typography...</p>
  <pre><code>Code blocks styled</code></pre>
</article>

// Size variants
<div className="prose-sm">...</div>  // Smaller text
<div className="prose-lg">...</div>  // Larger text
<div className="prose-xl">...</div>  // Extra large
```

## Class Merging with cn()

### Why Use cn()

The `cn()` function from `@imkdw-dev/ui/lib` combines:

- `clsx` for conditional classes
- `tailwind-merge` for resolving Tailwind class conflicts

```typescript
import { cn } from '@imkdw-dev/ui/lib';

// Resolves conflicts (last wins)
cn('p-4', 'p-8'); // => 'p-8'
cn('text-red-500', 'text-blue-500'); // => 'text-blue-500'

// Conditional classes
cn('base', isActive && 'active', !isActive && 'inactive');

// With className prop (always last)
cn('component-styles', variant === 'primary' && 'primary-styles', className);
```

## Best Practices

### Use Semantic Colors

```typescript
// GOOD: Uses design system tokens
<div className="bg-background text-foreground border-border" />

// AVOID: Hardcoded colors (won't adapt to theme)
<div className="bg-gray-100 text-gray-900 border-gray-200" />
```

### Avoid !important

```typescript
// AVOID: Using important modifier
<div className="!p-4" />

// BETTER: Use cn() to resolve conflicts
<div className={cn('p-2', needsMorePadding && 'p-4')} />
```

### Group Related Classes

```typescript
// GOOD: Logical grouping
<button className={cn(
  // Layout
  'inline-flex items-center justify-center',
  // Sizing
  'h-10 px-4 py-2',
  // Colors
  'bg-primary text-primary-foreground',
  // States
  'hover:bg-primary/90 focus-visible:ring-2',
  // Transitions
  'transition-colors',
)} />
```

### Container Width

```typescript
// Project uses max-width: 1200px for 2xl screens
// Configured in preset:
// container: { center: true, padding: '2rem', screens: { '2xl': '1200px' } }

<div className="container">
  {/* Centered, padded, max 1200px */}
</div>
```

For detailed best practices, refer to:
[frontend CSS standards](../../../agent-os/standards/frontend/css.md)
