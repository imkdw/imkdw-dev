'use client';

import { ReactNode, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
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
    <Listbox.Button
      className={cn(
        'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Listbox.Button>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  return (
    <Listbox.Label className="block truncate">
      {placeholder}
    </Listbox.Label>
  );
}

export function SelectContent({ children }: SelectContentProps) {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover border py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        {children}
      </Listbox.Options>
    </Transition>
  );
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <Listbox.Option
      value={value}
      className={({ active, selected }) =>
        cn(
          'relative cursor-default select-none py-2 pl-10 pr-4',
          active ? 'bg-accent text-accent-foreground' : 'text-foreground',
          selected && 'bg-accent text-accent-foreground'
        )
      }
    >
      {({ selected }) => (
        <>
          <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
            {children}
          </span>
          {selected && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent-foreground">
              <Check className="h-4 w-4" />
            </span>
          )}
        </>
      )}
    </Listbox.Option>
  );
}