'use client';

import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

const DropdownMenu = Menu;

const DropdownMenuTrigger = Menu.Button;

const DropdownMenuGroup = ({ children }: React.PropsWithChildren) => <div role="group">{children}</div>;

const DropdownMenuPortal = ({ children }: React.PropsWithChildren) => <>{children}</>;

const DropdownMenuSub = ({ children }: React.PropsWithChildren) => <>{children}</>;

const DropdownMenuRadioGroup = ({ children }: React.PropsWithChildren) => <div role="radiogroup">{children}</div>;

interface DropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  inset?: boolean;
}

const DropdownMenuSubTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuSubTriggerProps>(
  ({ className, inset, children, ...props }, ref) => (
    <button
      ref={ref}
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
  )
);
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

interface DropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<'div'> {}

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<'div'> {
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = 'center', sideOffset = 4, children, ...props }, ref) => {
    const alignmentClasses = {
      start: 'origin-top-left',
      center: 'origin-top',
      end: 'origin-top-right',
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
          ref={ref}
          className={cn(
            'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none',
            alignmentClasses[align],
            align === 'end' && 'right-0',
            align === 'start' && 'left-0',
            className
          )}
          style={{ marginTop: sideOffset }}
          {...props}
        >
          {children}
        </Menu.Items>
      </Transition>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
  inset?: boolean;
  disabled?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, inset, disabled, children, ...props }, ref) => (
    <Menu.Item disabled={disabled}>
      {({ active, disabled: itemDisabled }) => (
        <button
          ref={ref}
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
  )
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

interface DropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<'button'> {
  checked?: boolean;
  disabled?: boolean;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked, disabled, ...props }, ref) => (
    <Menu.Item disabled={disabled}>
      {({ active, disabled: itemDisabled }) => (
        <button
          ref={ref}
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
  )
);
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

interface DropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<'button'> {
  value?: string;
  disabled?: boolean;
  checked?: boolean;
}

const DropdownMenuRadioItem = React.forwardRef<HTMLButtonElement, DropdownMenuRadioItemProps>(
  ({ className, children, checked, disabled, ...props }, ref) => (
    <Menu.Item disabled={disabled}>
      {({ active, disabled: itemDisabled }) => (
        <button
          ref={ref}
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
  )
);
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

interface DropdownMenuLabelProps extends React.ComponentPropsWithoutRef<'div'> {
  inset?: boolean;
}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, inset, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<'div'> {}

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn('ml-auto text-xs tracking-widest opacity-60', className)} {...props} />;
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};