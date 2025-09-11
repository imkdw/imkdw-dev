'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

export function Avatar({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    />
  );
}

interface AvatarImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src?: string;
  alt?: string;
}

export function AvatarImage({ className, src, alt, ...props }: AvatarImageProps) {
  const [imageLoadError, setImageLoadError] = React.useState(false);

  const handleError = () => {
    setImageLoadError(true);
  };

  // src가 없거나 이미지 로드 에러가 있으면 렌더링하지 않음
  if (!src || imageLoadError) {
    return null;
  }

  return (
    <img
      className={cn('aspect-square h-full w-full object-cover', className)}
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<'div'> {}

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    />
  );
}