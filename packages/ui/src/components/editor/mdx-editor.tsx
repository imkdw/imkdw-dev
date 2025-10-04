'use client';

import { forwardRef } from 'react';
import {
  MDXEditor as MDXEditorLib,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  linkDialogPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods,
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
        codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            javascript: 'JavaScript',
            typescript: 'TypeScript',
            jsx: 'JSX',
            tsx: 'TSX',
            css: 'CSS',
            html: 'HTML',
            json: 'JSON',
            python: 'Python',
            bash: 'Bash',
          },
        }),
        tablePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
});

MDXEditor.displayName = 'MDXEditor';
