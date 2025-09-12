'use client';

import * as React from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props extends React.ComponentPropsWithoutRef<typeof HeadlessDialog> {
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children, className, ...props }: Props) {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <HeadlessDialog as="div" className={cn('relative z-50', className)} onClose={onClose} {...props}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="contents">{children}</div>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}

interface DialogContentProps extends React.ComponentPropsWithoutRef<'div'> {
  onClose?: () => void;
}

export function DialogContent({ className, children, onClose, ...props }: DialogContentProps) {
  return (
    <Transition.Child
      as={React.Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <HeadlessDialog.Panel
        className={cn(
          'relative w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all border border-border',
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
      </HeadlessDialog.Panel>
    </Transition.Child>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
  );
}

export function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof HeadlessDialog.Title>) {
  return (
    <HeadlessDialog.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }: React.ComponentPropsWithoutRef<typeof HeadlessDialog.Description>) {
  return (
    <HeadlessDialog.Description className={cn('text-sm text-muted-foreground', className)} {...props} />
  );
}