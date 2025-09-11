import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border bg-background text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        terminal: 'border-terminal-bg bg-terminal-bg/5 text-terminal-foreground placeholder:text-terminal-foreground/50 font-mono focus-visible:ring-terminal-accent',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
      state: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-primary focus-visible:ring-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, state, label, helperText, errorMessage, successMessage, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasError = error || !!errorMessage;
    const hasSuccess = !!successMessage;
    const currentState = hasError ? 'error' : hasSuccess ? 'success' : state || 'default';

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId} 
            className={cn(
              "mb-2 block text-sm font-medium",
              variant === 'terminal' ? 'text-terminal-foreground font-mono' : 'text-foreground'
            )}
          >
            {label}
          </label>
        )}

        <input
          id={inputId}
          className={cn(inputVariants({ variant, size, state: currentState, className }))}
          ref={ref}
          {...props}
        />

        {errorMessage && (
          <p className={cn(
            "mt-1 text-sm text-destructive",
            variant === 'terminal' && 'font-mono'
          )}>
            {errorMessage}
          </p>
        )}

        {successMessage && !errorMessage && (
          <p className={cn(
            "mt-1 text-sm text-primary",
            variant === 'terminal' && 'font-mono'
          )}>
            {successMessage}
          </p>
        )}

        {helperText && !errorMessage && !successMessage && (
          <p className={cn(
            "mt-1 text-sm text-muted-foreground",
            variant === 'terminal' && 'font-mono text-terminal-foreground/70'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
