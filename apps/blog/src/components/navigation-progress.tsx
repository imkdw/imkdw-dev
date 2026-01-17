'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ProgressBar } from '@imkdw-dev/ui/primitives';
import { useNavigationProgress } from '@/hooks/use-navigation-progress';

function isInternalNavigation(anchor: HTMLAnchorElement, currentPathname: string): boolean {
  const href = anchor.getAttribute('href');
  if (!href) return false;

  if (href.startsWith('#')) return false;

  if (/^(https?:|mailto:|tel:)/.test(href)) return false;

  if (anchor.target === '_blank') return false;

  if (anchor.hasAttribute('download')) return false;

  if (href.startsWith('/')) {
    const [targetPath] = href.split(/[?#]/);
    return targetPath !== currentPathname;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    const [targetPath] = url.pathname.split(/[?#]/);
    return targetPath !== currentPathname;
  } catch {
    return false;
  }
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

export function NavigationProgress() {
  const { isLoading, progress, start, done } = useNavigationProgress();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const navigationStartedRef = useRef(false);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;

      if (navigationStartedRef.current) {
        done();
        navigationStartedRef.current = false;
      }
    }
  }, [pathname, done]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (isModifiedClick(event)) return;

      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      if (isInternalNavigation(anchor, pathname)) {
        navigationStartedRef.current = true;
        start();
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname, start]);

  return <ProgressBar progress={progress} isVisible={isLoading} />;
}
