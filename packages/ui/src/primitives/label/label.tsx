import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const labelVariants = cva(
  'font-medium leading-none transition-colors',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        terminal: 'text-terminal-foreground font-mono',
        required: 'text-foreground',
        optional: 'text-muted-foreground',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
      state: {
        default: '',
        error: 'text-destructive',
        success: 'text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, state, required = false, optional = false, disabled = false, children, ...props }, ref) => {
    // Determine the variant based on props
    const finalVariant = required && variant === 'default' ? 'required' : 
                        optional && variant === 'default' ? 'optional' : 
                        variant;

    // Determine the state based on disabled prop
    const finalState = disabled ? 'default' : state;

    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant: finalVariant, size, state: finalState }),
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-destructive" aria-label="required">
            *
          </span>
        )}
        {optional && !required && (
          <span className="ml-1 text-muted-foreground text-xs font-normal">
            (선택)
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };