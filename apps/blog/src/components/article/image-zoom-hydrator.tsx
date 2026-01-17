'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

interface ImageZoomTranslations {
  close: string;
  zoomIn: string;
  zoomOut: string;
}

const LightboxWrapper = dynamic(() => import('./lightbox-wrapper').then(mod => mod.LightboxWrapper), { ssr: false });

interface Props {
  containerSelector: string;
  translations: ImageZoomTranslations;
}

export function ImageZoomHydrator({ containerSelector, translations }: Props) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) {
      return;
    }

    const images = container.querySelectorAll<HTMLImageElement>('img');
    if (images.length === 0) {
      return;
    }

    const handleImageClick = (e: Event) => {
      const img = e.currentTarget as HTMLImageElement;
      setCurrentImage({
        src: img.src,
        alt: img.alt || '',
      });
      setOpen(true);
    };

    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', handleImageClick);
    });

    return () => {
      images.forEach(img => {
        img.style.cursor = '';
        img.removeEventListener('click', handleImageClick);
      });
    };
  }, [containerSelector]);

  if (!currentImage) {
    return null;
  }

  return <LightboxWrapper open={open} onClose={handleClose} image={currentImage} translations={translations} />;
}
