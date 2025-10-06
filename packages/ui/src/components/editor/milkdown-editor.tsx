'use client';

import { defaultKeymap } from '@codemirror/commands';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { Editor, defaultValueCtx, editorCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core';
import { upload, uploadConfig } from '@milkdown/kit/plugin/upload';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { Milkdown, useEditor } from '@milkdown/react';
import { nord } from '@milkdown/theme-nord';
import { codeBlockComponent, codeBlockConfig } from '@milkdown/kit/component/code-block';
import { imageBlockComponent } from '@milkdown/kit/component/image-block';
import { clipboard } from '@milkdown/kit/plugin/clipboard';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { getHTML } from '@milkdown/kit/utils';
import { basicSetup } from 'codemirror';
import { history } from '@milkdown/kit/plugin/history';
import { createImageUploader } from './image-uploader';
import { useImageUpload } from '@imkdw-dev/hooks';

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(html: string): void;
  onUploadImage(imageName: string): void;
}

export function MilkdownEditor({ content, isEditable, onChangeContent, onUploadImage }: Props) {
  const { uploadImage } = useImageUpload();

  const uploader = createImageUploader({ uploadImage, onUploadImage });

  useEditor(root =>
    Editor.make()
      .config(nord)
      .config(ctx => ctx.set(defaultValueCtx, content))
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
            class: 'milkdown-editor',
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
        const listenerManager = ctx.get(listenerCtx);
        listenerManager.markdownUpdated((innerCtx, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            const editor = innerCtx.get(editorCtx);
            const html = editor.action(getHTML());
            onChangeContent(html);
          }
        });
      })

      .use(listener)
      .use(commonmark)
      .use(history)
      .use(imageBlockComponent)
      .use(gfm)
      .use(upload)
      .use(clipboard)
      .use(codeBlockComponent)
  );

  return <Milkdown />;
}
