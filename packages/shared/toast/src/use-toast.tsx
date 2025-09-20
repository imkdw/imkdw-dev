'use client';

import { useState, useCallback, Dispatch, SetStateAction } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface Toast extends ToastProps {
  id: string;
  timestamp: number;
}

let toastCount = 0;

function generateId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function removeToast(toastId: string, setToasts: Dispatch<SetStateAction<Toast[]>>) {
  setToasts(prev => prev.filter(t => t.id !== toastId));

  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
    toastTimeouts.delete(toastId);
  }
}

let setToastsGlobal: Dispatch<SetStateAction<Toast[]>> | null = null;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  setToastsGlobal = setToasts;

  const toast = useCallback(
    ({ title, description, variant = 'default' }: ToastProps) => {
      const id = generateId();
      const newToast: Toast = {
        id,
        title,
        description,
        variant,
        timestamp: Date.now(),
      };

      setToasts(prev => [...prev, newToast]);

      const timeout = setTimeout(() => {
        removeToast(id, setToasts);
      }, 5000);

      toastTimeouts.set(id, timeout);

      return {
        id,
        dismiss: () => removeToast(id, setToasts),
      };
    },
    [setToasts]
  );

  const dismiss = useCallback(
    (toastId: string) => {
      removeToast(toastId, setToasts);
    },
    [setToasts]
  );

  return {
    toast,
    dismiss,
    toasts,
  };
}

export function toast(props: ToastProps) {
  if (!setToastsGlobal) {
    console.warn('Toast provider not initialized');
    return { id: '', dismiss: () => {} };
  }

  const id = generateId();
  const newToast: Toast = {
    id,
    ...props,
    timestamp: Date.now(),
  };

  setToastsGlobal(prev => [...prev, newToast]);

  const timeout = setTimeout(() => {
    if (setToastsGlobal) {
      removeToast(id, setToastsGlobal);
    }
  }, 5000);

  toastTimeouts.set(id, timeout);

  return {
    id,
    dismiss: () => {
      if (setToastsGlobal) {
        removeToast(id, setToastsGlobal);
      }
    },
  };
}
