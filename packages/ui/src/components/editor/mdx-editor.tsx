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

interface Props {
  markdown: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
  className?: string;
}

export const MDXEditor = forwardRef<MDXEditorMethods, Props>(({ markdown, onChange, placeholder, className }, ref) => {
  return (
    <MDXEditorLib
      ref={ref}
      markdown={markdown}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
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
