import { useEffect } from 'react';

/**
 * Hook for handling keyboard events
 * Supports key combinations and modifiers
 */
export interface KeyboardOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  target?: EventTarget | null;
}

export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: KeyboardOptions = {}
) {
  const {
    enabled = true,
    preventDefault = false,
    stopPropagation = false,
    target = typeof window !== 'undefined' ? window : null,
  } = options;

  useEffect(() => {
    if (!enabled || !target) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key || event.code === key) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        handler(event);
      }
    };

    target.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [key, handler, enabled, preventDefault, stopPropagation, target]);
}

/**
 * Hook for handling Escape key
 */
export function useEscapeKey(
  handler: (event: KeyboardEvent) => void,
  enabled: boolean = true
) {
  useKeyboard('Escape', handler, { enabled });
}

/**
 * Hook for handling Enter key
 */
export function useEnterKey(
  handler: (event: KeyboardEvent) => void,
  enabled: boolean = true
) {
  useKeyboard('Enter', handler, { enabled });
}

/**
 * Hook for handling keyboard shortcuts with modifiers
 */
export interface ShortcutOptions extends KeyboardOptions {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean; // Cmd on Mac, Win on Windows
}

export function useKeyboardShortcut(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: ShortcutOptions = {}
) {
  const {
    enabled = true,
    preventDefault = true,
    stopPropagation = true,
    ctrl = false,
    alt = false,
    shift = false,
    meta = false,
    target = typeof window !== 'undefined' ? window : null,
  } = options;

  useEffect(() => {
    if (!enabled || !target) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMatches = event.key.toLowerCase() === key.toLowerCase() ||
                        event.code.toLowerCase() === key.toLowerCase();
      
      const modifiersMatch = 
        event.ctrlKey === ctrl &&
        event.altKey === alt &&
        event.shiftKey === shift &&
        event.metaKey === meta;

      if (keyMatches && modifiersMatch) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        handler(event);
      }
    };

    target.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      target.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [key, handler, enabled, preventDefault, stopPropagation, ctrl, alt, shift, meta, target]);
}