import { InputRule } from '@milkdown/kit/prose/inputrules';
import { $inputRule } from '@milkdown/kit/utils';
import { editorViewCtx } from '@milkdown/kit/core';
import type { Node } from '@milkdown/kit/prose/model';
import { linkPreviewNode } from './link-preview-node';
import type { LinkPreviewPluginOptions } from './link-preview-plugin';

const URL_REGEX = /(https?:\/\/[^\s]+)\s$/;

function findLinkPreviewNodePos(doc: Node, url: string): number | null {
  let foundPos: number | null = null;
  doc.descendants((node, pos) => {
    if (node.type.name === 'link_preview' && node.attrs.url === url && node.attrs.loading) {
      foundPos = pos;
      return false;
    }
    return true;
  });
  return foundPos;
}

export function createLinkPreviewInputRule(options: LinkPreviewPluginOptions) {
  return $inputRule(ctx => {
    const nodeType = linkPreviewNode.type(ctx);

    return new InputRule(URL_REGEX, (state, match, start, end) => {
      const url = match[1];
      if (!url) return null;

      const { tr } = state;
      const node = nodeType.create({ url, loading: true });
      tr.replaceRangeWith(start, end, node);

      (async () => {
        try {
          const metadata = await options.onFetchMetadata(url);
          const view = ctx.get(editorViewCtx);
          const pos = findLinkPreviewNodePos(view.state.doc, url);
          if (pos === null) return;

          view.dispatch(
            view.state.tr.setNodeMarkup(pos, nodeType, {
              url,
              ...metadata,
              loading: false,
            })
          );
        } catch {
          const view = ctx.get(editorViewCtx);
          const pos = findLinkPreviewNodePos(view.state.doc, url);
          if (pos === null) return;

          view.dispatch(
            view.state.tr.setNodeMarkup(pos, nodeType, {
              url,
              title: url,
              loading: false,
            })
          );
        }
      })();

      return tr;
    });
  });
}
