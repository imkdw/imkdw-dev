import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground transition-colors',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        gradient: 'shadow-sm bg-gradient-to-br from-card to-card/95',
        terminal: 'bg-terminal-bg/5 text-terminal-foreground border-terminal-bg font-mono shadow-terminal',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      shadow: {
        none: 'shadow-none',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shadow: 'sm',
    },
  }
);

const cardHeaderVariants = cva(
  'flex flex-col space-y-1.5',
  {
    variants: {
      size: {
        sm: 'p-3 pb-2',
        md: 'p-4 pb-3',
        lg: 'p-6 pb-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const cardTitleVariants = cva(
  'font-semibold leading-none tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
      },
      variant: {
        default: '',
        terminal: 'font-mono text-terminal-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const cardDescriptionVariants = cva(
  'text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      variant: {
        default: '',
        terminal: 'font-mono text-terminal-foreground/70',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const cardContentVariants = cva(
  '',
  {
    variants: {
      size: {
        sm: 'p-3 pt-0',
        md: 'p-4 pt-0',
        lg: 'p-6 pt-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const cardFooterVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'p-3 pt-0',
        md: 'p-4 pt-0',
        lg: 'p-6 pt-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, shadow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, shadow, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size, className }))}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, variant, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants({ size, variant, className }))}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size, variant, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants({ size, variant, className }))}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size, className }))}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size, className }))}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };