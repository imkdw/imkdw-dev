'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LinkPreviewCard } from './link-preview-card';

interface Props {
  containerSelector: string;
}

export function LinkPreviewHydrator({ containerSelector }: Props) {
  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const linkPreviews = container.querySelectorAll<HTMLDivElement>('[data-type="link-preview"]');

    linkPreviews.forEach(element => {
      const url = element.getAttribute('data-url') ?? '';
      const title = element.getAttribute('data-title');
      const description = element.getAttribute('data-description');
      const image = element.getAttribute('data-image');
      const siteName = element.getAttribute('data-site-name');
      const favicon = element.getAttribute('data-favicon');

      const root = createRoot(element);
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
  }, [containerSelector]);

  return null;
}
