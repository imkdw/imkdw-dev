'use client';

import { ReactNode } from 'react';
import { Radio, RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { cn } from '../lib/utils';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface RadioGroupItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ value, onValueChange, children, className }: RadioGroupProps) {
  return (
    <HeadlessRadioGroup value={value} onChange={onValueChange} className={cn('space-y-2', className)}>
      {children}
    </HeadlessRadioGroup>
  );
}

export function RadioGroupItem({ value, children, className }: RadioGroupItemProps) {
  return (
    <Radio
      value={value}
      className={({ checked, focus }) =>
        cn(
          'flex items-center gap-3 cursor-pointer rounded-lg px-4 py-3 transition-all',
          'border border-input hover:border-hover hover:bg-muted/50',
          checked && 'border-primary bg-primary/5',
          focus && 'ring-2 ring-primary ring-offset-2',
          className
        )
      }
    >
      {({ checked }) => (
        <>
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
              checked ? 'border-primary' : 'border-muted-foreground/30'
            )}
          >
            <div
              className={cn(
                'h-2.5 w-2.5 rounded-full bg-primary transition-opacity',
                checked ? 'opacity-100' : 'opacity-0'
              )}
            />
          </div>
          <div className="flex-1">{children}</div>
        </>
      )}
    </Radio>
  );
}
