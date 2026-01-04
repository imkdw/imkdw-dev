'use client';

import { useInstance } from '@milkdown/react';
import { replaceAll } from '@milkdown/kit/utils';
import { useEffect, useRef } from 'react';
import { createTurndownService, preprocessLinkPreviews } from './turndown-config';

interface Props {
  onReady: (replaceContent: (content: string) => void) => void;
}

export function EditorController({ onReady }: Props) {
  const [isLoading, getInstance] = useInstance();
  const turndownRef = useRef(createTurndownService());
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (isLoading) return;

    const replaceContent = (htmlContent: string) => {
      const editor = getInstance();
      const isHTML = /<[^>]+>/.test(htmlContent);
      const markdown = isHTML ? turndownRef.current.turndown(preprocessLinkPreviews(htmlContent)) : htmlContent;

      editor.action(replaceAll(markdown));
    };

    onReadyRef.current(replaceContent);
  }, [isLoading, getInstance]);

  return null;
}
