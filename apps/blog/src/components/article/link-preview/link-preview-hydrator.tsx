'use client';

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { LinkPreviewCard } from './link-preview-card';

interface Props {
  containerSelector: string;
}

const HYDRATED_ATTR = 'data-link-preview-hydrated';

export function LinkPreviewHydrator({ containerSelector }: Props) {
  const rootsRef = useRef<ReturnType<typeof createRoot>[]>([]);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let rafId: number | null = null;

    const hydrateElements = (container: Element) => {
      const linkPreviews = container.querySelectorAll<HTMLDivElement>(
        `[data-type="link-preview"]:not([${HYDRATED_ATTR}])`
      );

      linkPreviews.forEach(element => {
        element.setAttribute(HYDRATED_ATTR, 'true');

        const url = element.getAttribute('data-url') ?? '';
        const title = element.getAttribute('data-title');
        const description = element.getAttribute('data-description');
        const image = element.getAttribute('data-image');
        const siteName = element.getAttribute('data-site-name');
        const favicon = element.getAttribute('data-favicon');

        const root = createRoot(element);
        rootsRef.current.push(root);
        root.render(
          <LinkPreviewCard
            url={url}
            title={title}
            description={description}
            image={image}
            siteName={siteName}
            favicon={favicon}
          />
        );
      });
    };

    const init = () => {
      const container = document.querySelector(containerSelector);
      if (!container) {
        rafId = requestAnimationFrame(init);
        return;
      }

      hydrateElements(container);

      observer = new MutationObserver(() => hydrateElements(container));
      observer.observe(container, { childList: true, subtree: true });
    };

    rafId = requestAnimationFrame(init);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer?.disconnect();
      const roots = rootsRef.current;
      rootsRef.current = [];
      queueMicrotask(() => {
        roots.forEach(root => root.unmount());
      });
    };
  }, [containerSelector]);

  return null;
}
