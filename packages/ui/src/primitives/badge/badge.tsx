import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'bg-primary text-primary-foreground hover:bg-primary/80',
        warning: 'bg-terminal-warning text-terminal-background hover:bg-terminal-warning/80',
        info: 'bg-terminal-info text-terminal-background hover:bg-terminal-info/80',
        outline: 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
        terminal: 'bg-terminal-bg text-terminal-foreground hover:bg-terminal-bg/80 font-mono',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'pill',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape, className }))}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };