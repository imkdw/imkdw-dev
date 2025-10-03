'use client';

import { useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
}

export function useToast() {
  const toast = useCallback(({ title, description, variant = 'default', duration }: ToastProps) => {
    const message = description ? `${title}\n${description}` : title;

    switch (variant) {
      case 'destructive':
        return sonnerToast.error(message, { duration });
      case 'success':
        return sonnerToast.success(message, { duration });
      case 'warning':
        return sonnerToast.warning(message, { duration });
      case 'info':
        return sonnerToast.info(message, { duration });
      default:
        return sonnerToast(message, { duration });
    }
  }, []);

  const dismiss = useCallback((toastId: string | number) => {
    sonnerToast.dismiss(toastId);
  }, []);

  return {
    toast,
    dismiss,
    toasts: [],
  };
}

export function toast(props: ToastProps) {
  const message = props.description ? `${props.title}\n${props.description}` : props.title;

  switch (props.variant) {
    case 'destructive':
      return sonnerToast.error(message, { duration: props.duration });
    case 'success':
      return sonnerToast.success(message, { duration: props.duration });
    case 'warning':
      return sonnerToast.warning(message, { duration: props.duration });
    case 'info':
      return sonnerToast.info(message, { duration: props.duration });
    default:
      return sonnerToast(message, { duration: props.duration });
  }
}