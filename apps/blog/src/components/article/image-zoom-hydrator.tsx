'use client';

import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface ImageZoomTranslations {
  close: string;
  zoomIn: string;
  zoomOut: string;
}

interface Props {
  containerSelector: string;
  translations: ImageZoomTranslations;
}

export function ImageZoomHydrator({ containerSelector, translations }: Props) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

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

  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={[{ src: currentImage.src, alt: currentImage.alt }]}
      plugins={[Zoom]}
      zoom={{
        maxZoomPixelRatio: 3,
        scrollToZoom: true,
      }}
      carousel={{ finite: true }}
      controller={{ closeOnBackdropClick: true }}
      render={{
        buttonPrev: () => null,
        buttonNext: () => null,
      }}
      labels={{
        Close: translations.close,
        'Zoom in': translations.zoomIn,
        'Zoom out': translations.zoomOut,
      }}
    />
  );
}
