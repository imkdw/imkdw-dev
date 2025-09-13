'use client';

import { ComponentPropsWithoutRef, ReactNode, useEffect } from 'react';
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
  Description as HeadlessDialogDescription,
  DialogBackdrop,
} from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface DialogProps extends ComponentPropsWithoutRef<typeof HeadlessDialog> {
  children: ReactNode;
}

export function Dialog({ open, onClose, children, className, ...props }: DialogProps) {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (open) {
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

      const originalBodyStyle = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
      };

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const fixedElements = document.querySelectorAll('[style*="position: fixed"], .fixed');
      const originalFixedStyles: { element: Element; paddingRight: string }[] = [];

      fixedElements.forEach(el => {
        const element = el as HTMLElement;
        originalFixedStyles.push({
          element,
          paddingRight: element.style.paddingRight,
        });
        if (scrollbarWidth > 0) {
          element.style.paddingRight = `${scrollbarWidth}px`;
        }
      });

      return () => {
        setTimeout(() => {
          document.body.style.overflow = originalBodyStyle.overflow;
          document.body.style.paddingRight = originalBodyStyle.paddingRight;

          originalFixedStyles.forEach(({ element, paddingRight }) => {
            (element as HTMLElement).style.paddingRight = paddingRight;
          });

          document.documentElement.style.removeProperty('--scrollbar-width');
        }, 200);
      };
    }
  }, [open]);

  return (
    <HeadlessDialog open={open} onClose={onClose} className={cn('relative z-50', className)} transition {...props}>
      <DialogBackdrop transition className="fixed inset-0 bg-black/70 duration-300 ease-out data-closed:opacity-0" />

      <div className="fixed inset-0 overflow-y-auto" style={{ marginRight: `calc(-1 * var(--scrollbar-width, 0px))` }}>
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div className="contents">{children}</div>
        </div>
      </div>
    </HeadlessDialog>
  );
}

interface DialogContentProps extends ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
}

export function DialogContent({ className, children, onClose, ...props }: DialogContentProps) {
  return (
    <DialogPanel
      transition
      className={cn(
        'relative w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl duration-300 ease-out data-closed:opacity-0 data-closed:scale-95 border border-border',
        className
      )}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </DialogPanel>
  );
}

export function DialogHeader({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessDialogTitle>) {
  return (
    <HeadlessDialogTitle className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
  );
}

export function DialogDescription({ className, ...props }: ComponentPropsWithoutRef<typeof HeadlessDialogDescription>) {
  return <HeadlessDialogDescription className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
