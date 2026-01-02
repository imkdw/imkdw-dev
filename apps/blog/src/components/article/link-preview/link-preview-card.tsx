/* eslint-disable @next/next/no-img-element */
import { cn } from '@imkdw-dev/ui';
import { ExternalLink, Globe } from 'lucide-react';

interface Props {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
  className?: string;
}

export function LinkPreviewCard({ url, title, description, image, siteName, favicon, className }: Props) {
  const hostname = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex gap-4 p-4 border border-border rounded-lg bg-card overflow-hidden',
        'transition-colors duration-200 hover:bg-accent/50 hover:border-primary/30',
        'no-underline',
        className
      )}
    >
      {image && (
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          <img src={image} alt={title ?? 'Preview'} className="w-full h-full object-cover" loading="lazy" />
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
          {hostname}
          <ExternalLink size={12} className="flex-shrink-0" />
        </span>
      </div>
    </a>
  );
}
