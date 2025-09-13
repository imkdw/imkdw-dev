'use client';

import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

export const DropdownMenu = Menu;

export const DropdownMenuTrigger = Menu.Button;

export function DropdownMenuGroup({ children }: React.PropsWithChildren) {
  return <div role="group">{children}</div>;
}

export function DropdownMenuPortal({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

export function DropdownMenuSub({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

export function DropdownMenuRadioGroup({ children }: React.PropsWithChildren) {
  return <div role="radiogroup">{children}</div>;
}

interface DropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  inset?: boolean;
}

export function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <button
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent hover:bg-accent',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </button>
  );
}

export function DropdownMenuSubContent({ className, children, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
  align?: 'start' | 'center' | 'end';
}

export function DropdownMenuContent({ className, align = 'end', children, ...props }: DropdownMenuContentProps) {
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        static
        className={cn(
          'absolute top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none',
          alignmentClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
}

interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  inset?: boolean;
  disabled?: boolean;
}

export function DropdownMenuItem({ className, inset, disabled, children, ...props }: DropdownMenuItemProps) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active, disabled: itemDisabled }) => (
        <button
          className={cn(
            'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
            active && 'bg-accent text-accent-foreground',
            itemDisabled && 'pointer-events-none opacity-50',
            inset && 'pl-8',
            className
          )}
          disabled={itemDisabled}
          {...props}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

interface DropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<'button'> {
  checked?: boolean;
  disabled?: boolean;
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  disabled,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active, disabled: itemDisabled }) => (
        <button
          className={cn(
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
            active && 'bg-accent text-accent-foreground',
            itemDisabled && 'pointer-events-none opacity-50',
            className
          )}
          disabled={itemDisabled}
          {...props}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            {checked && <Check className="h-4 w-4" />}
          </span>
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

interface DropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<'button'> {
  value?: string;
  disabled?: boolean;
  checked?: boolean;
}

export function DropdownMenuRadioItem({
  className,
  children,
  checked,
  disabled,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <Menu.Item disabled={disabled}>
      {({ active, disabled: itemDisabled }) => (
        <button
          className={cn(
            'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors',
            active && 'bg-accent text-accent-foreground',
            itemDisabled && 'pointer-events-none opacity-50',
            className
          )}
          disabled={itemDisabled}
          {...props}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            {checked && <Circle className="h-2 w-2 fill-current" />}
          </span>
          {children}
        </button>
      )}
    </Menu.Item>
  );
}

interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<'div'> {
  inset?: boolean;
}

export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return <div className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />;
}
