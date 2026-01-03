/* eslint-disable @next/next/no-img-element */
import { Globe } from 'lucide-react';

interface Props {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
}

export function LinkPreviewCard({ url, title, description, image, favicon }: Props) {
  const hasImage = image && image.trim() !== '';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview-card">
      <div className="link-preview-content">
        <div className="link-preview-title">{title ?? url}</div>
        {description && <div className="link-preview-description">{description}</div>}
        <div className="link-preview-url-row">
          {favicon ? (
            <img src={favicon} alt="" className="link-preview-favicon" />
          ) : (
            <Globe className="link-preview-favicon text-muted-foreground" />
          )}
          <span className="link-preview-url">{url}</span>
        </div>
      </div>
      {hasImage && (
        <div className="link-preview-image-container">
          <img src={image} alt={title ?? 'Preview'} className="link-preview-image" loading="eager" />
        </div>
      )}
    </a>
  );
}
