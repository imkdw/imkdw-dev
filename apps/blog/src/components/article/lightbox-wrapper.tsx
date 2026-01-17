'use client';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

interface ImageZoomTranslations {
  close: string;
  zoomIn: string;
  zoomOut: string;
}

interface LightboxWrapperProps {
  open: boolean;
  onClose: () => void;
  image: { src: string; alt: string };
  translations: ImageZoomTranslations;
}

export function LightboxWrapper({ open, onClose, image, translations }: LightboxWrapperProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={[{ src: image.src, alt: image.alt }]}
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
