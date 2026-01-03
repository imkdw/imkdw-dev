'use client';

import { useNodeViewContext } from '@prosemirror-adapter/react';
import { ExternalLink, Globe } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { LinkPreviewAttrs } from './link-preview-node';

export function LinkPreviewEditorComponent() {
  const { node } = useNodeViewContext();
  const { url, title, description, image, siteName, favicon, loading } = node.attrs as LinkPreviewAttrs;

  if (loading) {
    return (
      <div
        className={cn('flex gap-4 p-4 border border-border rounded-lg bg-card overflow-hidden', 'animate-pulse')}
        contentEditable={false}
      >
        <div className="w-24 h-24 flex-shrink-0 rounded-md bg-muted" />
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <div className="w-24 h-3 rounded bg-muted" />
          </div>
          <div className="w-3/4 h-4 rounded bg-muted" />
          <div className="w-full h-3 rounded bg-muted" />
          <div className="w-2/3 h-3 rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex gap-4 p-4 border border-border rounded-lg bg-card overflow-hidden',
        'transition-colors duration-200 hover:bg-accent/50 hover:border-primary/30',
        'no-underline'
      )}
      contentEditable={false}
    >
      {image && (
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          <img src={image} alt={title ?? 'Preview'} className="w-full h-full object-cover" loading="eager" />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <div className="flex items-center gap-2">
          {favicon ? (
            <img src={favicon} alt="" className="w-4 h-4 rounded-sm flex-shrink-0" />
          ) : (
            <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          )}
          {siteName && <span className="text-xs text-muted-foreground truncate">{siteName}</span>}
        </div>
        <h4 className="font-semibold text-foreground line-clamp-2 leading-snug">{title ?? url}</h4>
        {description && <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>}
        <span className="flex items-center gap-1.5 text-xs text-primary mt-auto">
          {(() => {
            try {
              return new URL(url).hostname;
            } catch {
              return url;
            }
          })()}
          <ExternalLink size={12} className="flex-shrink-0" />
        </span>
      </div>
    </a>
  );
}
