'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  children: React.ReactNode;
}

interface PaginationContentProps {
  children: React.ReactNode;
}

interface PaginationItemProps {
  children: React.ReactNode;
}

interface PaginationLinkProps {
  href: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}

interface PaginationPreviousProps {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

interface PaginationNextProps {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function Pagination({ children }: Props) {
  return (
    <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-center">
      {children}
    </nav>
  );
}

export function PaginationContent({ children }: PaginationContentProps) {
  return <div className="flex flex-row items-center gap-1">{children}</div>;
}

export function PaginationItem({ children }: PaginationItemProps) {
  return <div>{children}</div>;
}

export function PaginationLink({ isActive, onClick, children, className, ...props }: PaginationLinkProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'h-9 px-3',
        isActive
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function PaginationPrevious({ onClick, className, ...props }: PaginationPreviousProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'h-9 px-3 gap-1 pl-2.5',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </button>
  );
}

export function PaginationNext({ onClick, className, ...props }: PaginationNextProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'h-9 px-3 gap-1 pr-2.5',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}
