'use client';

import { forwardRef } from 'react';
import {
  MDXEditor as MDXEditorLib,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods,
  codeBlockPlugin,
  codeMirrorPlugin,
} from '@mdxeditor/editor';
import { cn } from '../../lib';

interface Props {
  markdown: string;
  onChange: (markdown: string) => void;
  className?: string;
}

export const MDXEditor = forwardRef<MDXEditorMethods, Props>(({ markdown, onChange, className }, ref) => {
  return (
    <MDXEditorLib
      ref={ref}
      markdown={markdown}
      onChange={onChange}
      className={cn(className, 'dark-theme dark-editor')}
      contentEditableClassName="mdx-editor-content"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', ts: 'TypeScript' } }),
        markdownShortcutPlugin(),
      ]}
    />
  );
});

MDXEditor.displayName = 'MDXEditor';
