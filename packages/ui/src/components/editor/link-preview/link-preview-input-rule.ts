import { InputRule } from '@milkdown/kit/prose/inputrules';
import { $inputRule } from '@milkdown/kit/utils';
import { editorViewCtx } from '@milkdown/kit/core';
import { linkPreviewNode } from './link-preview-node';
import type { LinkPreviewPluginOptions } from './link-preview-plugin';

const URL_REGEX = /^(https?:\/\/[^\s]+)$/;

export function createLinkPreviewInputRule(options: LinkPreviewPluginOptions) {
  return $inputRule(ctx => {
    return new InputRule(URL_REGEX, (state, match, start, end) => {
      const url = match[1];
      if (!url) return null;

      const { tr } = state;
      const nodeType = linkPreviewNode.type(ctx);

      const node = nodeType.create({ url, loading: true });
      tr.replaceRangeWith(start, end, node);

      options
        .onFetchMetadata(url)
        .then(metadata => {
          const view = ctx.get(editorViewCtx);
          const pos = tr.mapping.map(start);
          view.dispatch(
            view.state.tr.setNodeMarkup(pos, undefined, {
              url,
              ...metadata,
              loading: false,
            })
          );
        })
        .catch(() => {
          const view = ctx.get(editorViewCtx);
          const pos = tr.mapping.map(start);
          view.dispatch(
            view.state.tr.setNodeMarkup(pos, undefined, {
              url,
              title: url,
              loading: false,
            })
          );
        });

      return tr;
    });
  });
}
