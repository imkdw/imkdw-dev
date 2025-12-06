---
name: Frontend Accessibility
description: Implement accessible UI components following WCAG guidelines in Next.js and React applications. Use this skill when creating or modifying React components (*.tsx), working with Radix UI or Headless UI primitives, implementing keyboard navigation, adding ARIA attributes, managing focus states in modals/dialogs, creating form inputs with proper labels, building navigation menus, implementing skip links, or ensuring color contrast compliance. This includes files in apps/blog/src/components/, packages/ui/src/primitives/, packages/ui/src/components/, and any component using @headlessui/react or @radix-ui/* packages. Apply when working with interactive elements like buttons, links, dropdowns, dialogs, or any focusable elements.
---

# Frontend Accessibility

## When to use this skill:

- When creating or modifying React components (\*.tsx files)
- When implementing keyboard navigation and focus management
- When adding ARIA attributes to custom components
- When working with Radix UI or Headless UI primitives
- When building modal dialogs, dropdown menus, or popovers
- When creating form inputs with proper label associations
- When implementing skip links or landmark regions
- When ensuring color contrast meets WCAG standards
- When building navigation components (header, sidebar, mobile nav)
- When working with files in `packages/ui/src/primitives/` or `packages/ui/src/components/`

## Core Principles

### Semantic HTML First

- Use appropriate HTML elements (`nav`, `main`, `button`, `article`, `section`, etc.) that convey meaning to assistive technologies
- Prefer semantic elements over ARIA attributes when possible
- Use heading levels (h1-h6) in proper hierarchical order

### Keyboard Navigation

- Ensure all interactive elements are accessible via keyboard
- Implement visible focus indicators using Tailwind's `focus-visible:` utilities
- Support standard keyboard patterns:
  - `Tab` / `Shift+Tab` for navigation
  - `Enter` / `Space` for activation
  - `Escape` for closing modals/dialogs
  - Arrow keys for menu navigation

### Focus Management

- Manage focus appropriately in dynamic content, modals, and SPAs
- Trap focus within modal dialogs (Radix UI and Headless UI handle this automatically)
- Return focus to trigger element when closing overlays
- Use `tabIndex` appropriately (-1 for programmatic focus, 0 for natural order)

### Color and Contrast

- Maintain sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Use design tokens from `packages/ui/src/tokens/colors.ts` which are pre-validated
- Never rely solely on color to convey information
- Test both light and dark modes for contrast compliance

### Screen Reader Support

- Provide descriptive `alt` text for images
- Use `aria-label` or `aria-labelledby` for icons and icon-only buttons
- Implement `aria-live` regions for dynamic content updates
- Hide decorative elements with `aria-hidden="true"`

## Project-Specific Patterns

### Using Radix UI Primitives

```typescript
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';

// Radix handles focus trapping, keyboard navigation, and ARIA automatically
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Accessible Title</DialogTitle>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Using Headless UI

```typescript
import { Menu } from '@headlessui/react';

// Headless UI provides complete keyboard navigation and ARIA
<Menu>
  <Menu.Button>Options</Menu.Button>
  <Menu.Items>
    <Menu.Item>{({ active }) => <button>Item</button>}</Menu.Item>
  </Menu.Items>
</Menu>
```

### Focus Visible Pattern

```typescript
// Use focus-visible for keyboard-only focus styles
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
  Click me
</button>
```

### Icon Buttons

```typescript
import { X } from 'lucide-react';

// Always provide accessible labels for icon-only buttons
<button aria-label="Close dialog" className="...">
  <X aria-hidden="true" />
</button>
```

## Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG AA standards
- [ ] Heading hierarchy is logical
- [ ] Images have appropriate alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers

For detailed best practices, refer to:
[frontend accessibility standards](../../../agent-os/standards/frontend/accessibility.md)
