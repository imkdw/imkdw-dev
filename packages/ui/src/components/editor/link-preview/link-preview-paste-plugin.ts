import { $prose } from '@milkdown/kit/utils';
import { Plugin, PluginKey, TextSelection } from '@milkdown/kit/prose/state';
import type { Node } from '@milkdown/kit/prose/model';
import { schemaCtx } from '@milkdown/kit/core';
import { linkPreviewNode } from './link-preview-node';
import type { LinkPreviewPluginOptions } from './link-preview-plugin';

const URL_REGEX = /^https?:\/\/[^\s]+$/;

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

export function createLinkPreviewPastePlugin(options: LinkPreviewPluginOptions) {
  return $prose(ctx => {
    const nodeType = linkPreviewNode.type(ctx);
    const schema = ctx.get(schemaCtx);

    return new Plugin({
      key: new PluginKey('link-preview-paste'),
      props: {
        handlePaste(view, event) {
          const text = event.clipboardData?.getData('text/plain').trim();
          if (!text || !URL_REGEX.test(text)) {
            return false;
          }

          const paragraphType = schema.nodes.paragraph;
          if (!paragraphType) return false;

          const { state, dispatch } = view;
          const linkPreview = nodeType.create({ url: text, loading: true });
          const paragraph = paragraphType.create();

          let tr = state.tr.replaceSelectionWith(linkPreview);

          let linkPreviewEndPos = 0;
          tr.doc.descendants((node, pos) => {
            if (node.type.name === 'link_preview' && node.attrs.url === text) {
              linkPreviewEndPos = pos + node.nodeSize;
              return false;
            }
            return true;
          });

          tr = tr.insert(linkPreviewEndPos, paragraph);
          tr = tr.setSelection(TextSelection.create(tr.doc, linkPreviewEndPos + 1));

          dispatch(tr);

          (async () => {
            try {
              const metadata = await options.onFetchMetadata(text);
              const pos = findLinkPreviewNodePos(view.state.doc, text);
              if (pos === null) return;

              view.dispatch(
                view.state.tr.setNodeMarkup(pos, nodeType, {
                  url: text,
                  ...metadata,
                  loading: false,
                })
              );
            } catch {
              const pos = findLinkPreviewNodePos(view.state.doc, text);
              if (pos === null) return;

              view.dispatch(
                view.state.tr.setNodeMarkup(pos, nodeType, {
                  url: text,
                  title: text,
                  loading: false,
                })
              );
            }
          })();

          return true;
        },
      },
    });
  });
}
