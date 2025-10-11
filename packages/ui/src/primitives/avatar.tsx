'use client';

import { useState } from 'react';
import { cn } from '../lib/utils';

export function Avatar({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)} {...props} />;
}

interface AvatarImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src?: string;
  alt?: string;
}

export function AvatarImage({ className, src, alt, ...props }: AvatarImageProps) {
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleError = () => {
    setImageLoadError(true);
  };

  if (!src || imageLoadError) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn('aspect-square h-full w-full object-cover', className)}
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

export function AvatarFallback({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)} {...props} />
  );
}
