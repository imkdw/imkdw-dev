'use client';

import { PropsWithChildren, ComponentPropsWithoutRef, HTMLAttributes } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

export const DropdownMenu = Menu;

export const DropdownMenuTrigger = MenuButton;

export function DropdownMenuGroup({ children }: PropsWithChildren) {
  return <div role="group">{children}</div>;
}

export function DropdownMenuPortal({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function DropdownMenuSub({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export function DropdownMenuRadioGroup({ children }: PropsWithChildren) {
  return <div role="radiogroup">{children}</div>;
}

interface DropdownMenuSubTriggerProps extends ComponentPropsWithoutRef<'button'> {
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

export function DropdownMenuSubContent({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
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

interface DropdownMenuContentProps extends ComponentPropsWithoutRef<'div'> {
  align?: 'start' | 'center' | 'end';
}

export function DropdownMenuContent({ className, align = 'end', children, ...props }: DropdownMenuContentProps) {
  return (
    <MenuItems
      transition
      anchor={align === 'center' ? 'bottom' : `bottom ${align}`}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md origin-top transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0',
        className
      )}
      {...props}
    >
      {children}
    </MenuItems>
  );
}

interface DropdownMenuItemProps extends ComponentPropsWithoutRef<'button'> {
  inset?: boolean;
  disabled?: boolean;
}

export function DropdownMenuItem({ className, inset, disabled, children, ...props }: DropdownMenuItemProps) {
  return (
    <MenuItem disabled={disabled}>
      <button
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-focus:bg-accent data-focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
          inset && 'pl-8',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </MenuItem>
  );
}

interface DropdownMenuCheckboxItemProps extends ComponentPropsWithoutRef<'button'> {
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
    <MenuItem disabled={disabled}>
      <button
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-focus:bg-accent data-focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Check className="h-4 w-4" />}
        </span>
        {children}
      </button>
    </MenuItem>
  );
}

interface DropdownMenuRadioItemProps extends ComponentPropsWithoutRef<'button'> {
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
    <MenuItem disabled={disabled}>
      <button
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-focus:bg-accent data-focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {checked && <Circle className="h-2 w-2 fill-current" />}
        </span>
        {children}
      </button>
    </MenuItem>
  );
}

interface DropdownMenuLabelProps extends ComponentPropsWithoutRef<'div'> {
  inset?: boolean;
}

export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return <div className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />;
}

export function DropdownMenuShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />;
}
