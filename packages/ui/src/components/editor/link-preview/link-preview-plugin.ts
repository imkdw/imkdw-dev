import type { MilkdownPlugin } from '@milkdown/kit/ctx';
import { $remark } from '@milkdown/kit/utils';
import remarkDirective from 'remark-directive';
import { linkPreviewNode } from './link-preview-node';
import { createLinkPreviewInputRule } from './link-preview-input-rule';
import { createLinkPreviewPastePlugin } from './link-preview-paste-plugin';

export const remarkDirectivePlugin = $remark('remarkDirective', () => remarkDirective);

export interface LinkPreviewPluginOptions {
  onFetchMetadata: (url: string) => Promise<{
    title: string | null;
    description: string | null;
    image: string | null;
    siteName: string | null;
    favicon: string | null;
  }>;
}

export function createLinkPreviewPlugin(options: LinkPreviewPluginOptions): MilkdownPlugin[] {
  return [
    remarkDirectivePlugin,
    linkPreviewNode,
    createLinkPreviewInputRule(options),
    createLinkPreviewPastePlugin(options),
  ] as MilkdownPlugin[];
}
