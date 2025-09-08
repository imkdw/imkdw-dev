import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, errorMessage, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasError = error || !!errorMessage;

    const baseClasses = [
      'flex h-10 w-full rounded-md border bg-primary px-3 py-2 text-sm text-primary',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors duration-200',
    ];

    const variantClasses = hasError
      ? [
          'border-destructive focus-visible:ring-destructive',
          'dark:border-destructive dark:focus-visible:ring-destructive',
        ]
      : [
          'border-default focus-visible:ring-accent',
          'dark:border-border-default dark:bg-background-primary dark:text-foreground-primary',
          'dark:placeholder:text-foreground-muted dark:focus-visible:ring-accent',
        ];

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-primary dark:text-foreground-primary">
            {label}
          </label>
        )}

        <input id={inputId} className={clsx(baseClasses, variantClasses, className)} ref={ref} {...props} />

        {errorMessage && <p className="mt-1 text-sm text-destructive dark:text-destructive">{errorMessage}</p>}

        {helperText && !errorMessage && (
          <p className="mt-1 text-sm text-muted dark:text-foreground-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
