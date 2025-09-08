import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ];

    const variantClasses = {
      primary: [
        'bg-accent text-white shadow hover:bg-accent-hover',
        'focus-visible:ring-accent',
        'dark:bg-accent dark:text-white dark:hover:bg-accent-hover',
      ],
      secondary: [
        'border border-default bg-primary text-primary shadow-sm hover:bg-secondary',
        'focus-visible:ring-accent',
        'dark:border-border-default dark:bg-background-primary dark:text-foreground-primary',
        'dark:hover:bg-background-secondary',
      ],
      ghost: [
        'hover:bg-secondary text-primary',
        'focus-visible:ring-accent',
        'dark:text-foreground-primary dark:hover:bg-background-secondary',
      ],
    };

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    };

    const loadingSpinner = (
      <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    return (
      <button
        className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && loadingSpinner}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
