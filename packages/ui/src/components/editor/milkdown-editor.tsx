'use client';

import { defaultKeymap } from '@codemirror/commands';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { Editor, defaultValueCtx, editorCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core';
import { upload, uploadConfig } from '@milkdown/kit/plugin/upload';
import { slashFactory } from '@milkdown/kit/plugin/slash';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { codeBlockComponent, codeBlockConfig } from '@milkdown/kit/component/code-block';
import { imageBlockComponent } from '@milkdown/kit/component/image-block';
import { tableBlock, tableBlockConfig, type RenderType } from '@milkdown/kit/component/table-block';
import { clipboard } from '@milkdown/kit/plugin/clipboard';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { getHTML } from '@milkdown/kit/utils';
import { basicSetup } from 'codemirror';
import { history } from '@milkdown/kit/plugin/history';
import { usePluginViewFactory, useNodeViewFactory } from '@prosemirror-adapter/react';
import { createImageUploader } from './image-uploader';
import { createTurndownService, preprocessLinkPreviews } from './turndown-config';
import { SlashMenu } from './slash-menu';
import { useImageUpload } from '@imkdw-dev/hooks';
import { renderToStaticMarkup } from 'react-dom/server';
import { Plus, Trash2, AlignLeft, AlignCenter, AlignRight, GripVertical, GripHorizontal } from 'lucide-react';
import { createLinkPreviewPlugin } from './link-preview/link-preview-plugin';
import { linkPreviewNode } from './link-preview/link-preview-node';
import { LinkPreviewEditorComponent } from './link-preview/link-preview-component';
import { $view } from '@milkdown/kit/utils';

const slash = slashFactory('slash-menu');

const tableBlockIcons = {
  plus: renderToStaticMarkup(<Plus size={16} />),
  trash2: renderToStaticMarkup(<Trash2 size={16} />),
  alignLeft: renderToStaticMarkup(<AlignLeft size={16} />),
  alignCenter: renderToStaticMarkup(<AlignCenter size={16} />),
  alignRight: renderToStaticMarkup(<AlignRight size={16} />),
  gripVertical: renderToStaticMarkup(<GripVertical size={16} />),
  gripHorizontal: renderToStaticMarkup(<GripHorizontal size={16} />),
} as const;

function renderTableButton(renderType: RenderType): string {
  switch (renderType) {
    case 'add_row':
      return tableBlockIcons.plus;
    case 'add_col':
      return tableBlockIcons.plus;
    case 'delete_row':
      return tableBlockIcons.trash2;
    case 'delete_col':
      return tableBlockIcons.trash2;
    case 'align_col_left':
      return tableBlockIcons.alignLeft;
    case 'align_col_center':
      return tableBlockIcons.alignCenter;
    case 'align_col_right':
      return tableBlockIcons.alignRight;
    case 'col_drag_handle':
      return tableBlockIcons.gripVertical;
    case 'row_drag_handle':
      return tableBlockIcons.gripHorizontal;
    default:
      return '';
  }
}

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(html: string): void;
  onUploadImage(imageName: string): void;
  onFetchMetadata?: (url: string) => Promise<{
    title: string | null;
    description: string | null;
    image: string | null;
    siteName: string | null;
    favicon: string | null;
  }>;
}

export function MilkdownEditor({ content, isEditable, onChangeContent, onUploadImage, onFetchMetadata }: Props) {
  const { uploadImage } = useImageUpload();
  const pluginViewFactory = usePluginViewFactory();
  const nodeViewFactory = useNodeViewFactory();

  const uploader = createImageUploader({ uploadImage, onUploadImage });

  const convertToMarkdown = (htmlContent: string): string => {
    const isHTML = /<[^>]+>/.test(htmlContent);

    if (isHTML) {
      const preprocessedHtml = preprocessLinkPreviews(htmlContent);
      const turndownService = createTurndownService();
      const markdown = turndownService.turndown(preprocessedHtml);
      return markdown;
    }

    return htmlContent;
  };

  const markdownContent = convertToMarkdown(content);

  const linkPreviewPlugin = createLinkPreviewPlugin({
    onFetchMetadata:
      onFetchMetadata ?? (async () => ({ title: null, description: null, image: null, siteName: null, favicon: null })),
  });

  useEditor(root =>
    Editor.make()
      .config(nord)
      .config(ctx => ctx.set(defaultValueCtx, markdownContent))
      .config(ctx => ctx.set(rootCtx, root))
      .config(ctx => {
        ctx.update(uploadConfig.key, prev => ({
          ...prev,
          uploader,
        }));
      })
      .config(ctx =>
        ctx.update(editorViewOptionsCtx, prev => ({
          ...prev,
          attributes: {
            ...prev.attributes,
            class: 'milkdown',
          },
          editable: () => isEditable,
        }))
      )
      .config(ctx => {
        ctx.update(codeBlockConfig.key, defaultConfig => ({
          ...defaultConfig,
          languages,
          extensions: [basicSetup, oneDark, keymap.of(defaultKeymap)],
        }));
      })
      .config(ctx => {
        ctx.update(tableBlockConfig.key, defaultConfig => ({
          ...defaultConfig,
          renderButton: renderTableButton,
        }));
      })
      .config(ctx => {
        const listenerManager = ctx.get(listenerCtx);
        listenerManager.markdownUpdated((innerCtx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            const editor = innerCtx.get(editorCtx);
            const html = editor.action(getHTML());
            onChangeContent(html);
          }
        });
      })
      .config(ctx => {
        ctx.set(slash.key, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Milkdown 타입 호환성 문제
          view: pluginViewFactory({ component: SlashMenu }) as any,
        });
      })
      .use(listener)
      .use(commonmark)
      .use(history)
      .use(imageBlockComponent)
      .use(gfm)
      .use(tableBlock)
      .use(upload)
      .use(clipboard)
      .use(codeBlockComponent)
      .use(linkPreviewPlugin)
      .use(
        $view(linkPreviewNode, () =>
          nodeViewFactory({
            component: LinkPreviewEditorComponent,
          })
        )
      )
      .use(slash)
  );

  return <Milkdown />;
}
