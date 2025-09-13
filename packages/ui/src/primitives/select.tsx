'use client';

import { ReactNode } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

interface SelectTriggerProps {
  className?: string;
  children: ReactNode;
}

interface SelectContentProps {
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

export function Select({ value, onValueChange, children }: Props) {
  return (
    <Listbox value={value} onChange={onValueChange}>
      <div className="relative">
        {children}
      </div>
    </Listbox>
  );
}

export function SelectTrigger({ className, children }: SelectTriggerProps) {
  return (
    <ListboxButton
      className={cn(
        'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </ListboxButton>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  return (
    <span className="block truncate">
      {placeholder}
    </span>
  );
}

export function SelectContent({ children }: SelectContentProps) {
  return (
    <ListboxOptions
      transition
      anchor="bottom"
      className="z-10 max-h-60 w-[var(--button-width)] overflow-auto rounded-md bg-popover border py-1 text-base shadow-lg focus:outline-none sm:text-sm origin-top transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
    >
      {children}
    </ListboxOptions>
  );
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <ListboxOption
      value={value}
      className="relative cursor-default select-none py-2 pl-10 pr-4 data-focus:bg-accent data-focus:text-accent-foreground data-selected:bg-accent data-selected:text-accent-foreground"
    >
      <span className="block truncate data-selected:font-medium data-not-selected:font-normal">
        {children}
      </span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-foreground opacity-0 data-selected:opacity-100">
        <Check className="h-4 w-4" />
      </span>
    </ListboxOption>
  );
}