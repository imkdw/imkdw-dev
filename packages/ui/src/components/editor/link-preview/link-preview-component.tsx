'use client';

import { useNodeViewContext } from '@prosemirror-adapter/react';
import { Globe } from 'lucide-react';
import type { LinkPreviewAttrs } from './link-preview-node';

export function LinkPreviewEditorComponent() {
  const { node } = useNodeViewContext();
  const { url, title, description, image, favicon, loading } = node.attrs as LinkPreviewAttrs;

  const hasImage = image && image.trim() !== '';

  if (loading) {
    return (
      <div className="link-preview-skeleton" contentEditable={false}>
        <div className="link-preview-content">
          <div style={{ width: '60%', height: '14px', borderRadius: '2px', background: 'hsl(var(--muted))' }} />
          <div style={{ width: '100%', height: '12px', borderRadius: '2px', background: 'hsl(var(--muted))' }} />
          <div className="link-preview-url-row">
            <div style={{ width: '14px', height: '14px', borderRadius: '2px', background: 'hsl(var(--muted))' }} />
            <div style={{ width: '100px', height: '12px', borderRadius: '2px', background: 'hsl(var(--muted))' }} />
          </div>
        </div>
        <div className="link-preview-image-container" />
      </div>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview-card" contentEditable={false}>
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
