'use client';

import { useEffect, useRef, useCallback } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Copy, Check } from 'lucide-react';
import { toast } from '@imkdw-dev/toast';

const COPY_ICON_SVG = renderToStaticMarkup(<Copy size={16} />);
const CHECK_ICON_SVG = renderToStaticMarkup(<Check size={16} />);

const RESET_DELAY_MS = 2_000;

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    } catch {
      return false;
    }
  }
}

interface CodeBlockHydratorProps {
  containerSelector?: string;
  showToastOnError?: boolean;
}

export function CodeBlockHydrator({
  containerSelector = '.milkdown',
  showToastOnError = true,
}: CodeBlockHydratorProps) {
  const timeoutIdsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);
  const announcementElementRef = useRef<HTMLDivElement | null>(null);

  const announceToScreenReader = useCallback((message: string) => {
    let liveRegion = announcementElementRef.current;
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
      document.body.appendChild(liveRegion);
      announcementElementRef.current = liveRegion;
    }

    liveRegion.textContent = '';
    const regionToUpdate = liveRegion;
    requestAnimationFrame(() => {
      regionToUpdate.textContent = message;
    });
  }, []);

  const updateButtonState = useCallback((button: HTMLButtonElement, copied: boolean) => {
    button.innerHTML = copied ? CHECK_ICON_SVG : COPY_ICON_SVG;
    button.setAttribute('aria-label', copied ? 'Code copied' : 'Copy code');
  }, []);

  const handleCopyClick = useCallback(
    async (button: HTMLButtonElement) => {
      const wrapper = button.closest('.code-block-wrapper');
      if (!wrapper) return;

      const codeElement = wrapper.querySelector('pre code');
      if (!codeElement?.textContent) return;

      const codeIndex = button.getAttribute('data-code-index') ?? '0';
      const code = codeElement.textContent;

      const existingTimeout = timeoutIdsRef.current.get(codeIndex);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        timeoutIdsRef.current.delete(codeIndex);
      }

      const success = await copyToClipboard(code);

      if (success) {
        updateButtonState(button, true);
        announceToScreenReader('Code copied to clipboard');

        const timeoutId = setTimeout(() => {
          updateButtonState(button, false);
          timeoutIdsRef.current.delete(codeIndex);
        }, RESET_DELAY_MS);

        timeoutIdsRef.current.set(codeIndex, timeoutId);
      } else {
        announceToScreenReader('Failed to copy code');
        if (showToastOnError) {
          toast({
            title: 'Failed to copy code',
            description: 'Please try selecting and copying manually',
            variant: 'destructive',
          });
        }
      }
    },
    [updateButtonState, showToastOnError, announceToScreenReader]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent, button: HTMLButtonElement) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCopyClick(button);
      }
    },
    [handleCopyClick]
  );

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const timeoutIds = timeoutIdsRef.current;
    const cleanupFunctions = cleanupFunctionsRef.current;
    const announcementElement = announcementElementRef.current;

    const copyButtons = container.querySelectorAll<HTMLButtonElement>('.code-block-copy');

    copyButtons.forEach(button => {
      const clickHandler = () => handleCopyClick(button);
      const keyHandler = (e: KeyboardEvent) => handleKeyDown(e, button);

      button.addEventListener('click', clickHandler);
      button.addEventListener('keydown', keyHandler as EventListener);

      cleanupFunctions.push(() => {
        button.removeEventListener('click', clickHandler);
        button.removeEventListener('keydown', keyHandler as EventListener);
      });
    });

    return () => {
      timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
      timeoutIds.clear();

      cleanupFunctions.forEach(cleanup => cleanup());
      cleanupFunctionsRef.current = [];

      if (announcementElement) {
        announcementElement.remove();
        announcementElementRef.current = null;
      }
    };
  }, [containerSelector, handleCopyClick, handleKeyDown]);

  return null;
}
