'use client';

import { useCallback } from 'react';
import hotToast, { ToastOptions as HotToastOptions } from 'react-hot-toast';
import { Toast as ToastCard, ToastTitle, ToastDescription, ToastClose } from './toast';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function useToast() {
  const toast = useCallback(({ title, description, variant = 'default', duration }: ToastProps) => {
    const options: HotToastOptions = {
      duration: duration ?? 1000,
      style: {
        background: 'transparent',
        color: 'inherit',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
        width: '360px',
        maxWidth: '90vw',
      },
    };

    const id = hotToast.custom(
      t => (
        <div
          className={`transform transition-all duration-300 ease-out ${
            t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <ToastCard variant={variant} className="relative group" style={{ width: 360, maxWidth: '90vw' }}>
            <div className="grid gap-1 pr-6">
              <ToastTitle>{title}</ToastTitle>
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
            <ToastClose
              aria-label="Close"
              onClick={() => hotToast.dismiss(t.id)}
              style={{ opacity: 1, position: 'absolute', top: '8px', right: '8px' }}
              className="hover:opacity-80"
            >
              ×
            </ToastClose>
          </ToastCard>
        </div>
      ),
      options
    ) as unknown as string;

    return {
      id,
      dismiss: () => hotToast.dismiss(id),
    };
  }, []);

  const dismiss = useCallback((toastId: string) => {
    hotToast.dismiss(toastId);
  }, []);

  return {
    toast,
    dismiss,
    toasts: [],
  };
}

export function toast(props: ToastProps) {
  const options: HotToastOptions = {
    duration: props.duration ?? 5000,
    style: {
      background: 'transparent',
      color: 'inherit',
      border: 'none',
      boxShadow: 'none',
      padding: 0,
      width: '360px',
      maxWidth: '90vw',
    },
  };

  const id = hotToast.custom(
    t => (
      <div
        className={`transform transition-all duration-300 ease-out ${
          t.visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <ToastCard
          variant={props.variant ?? 'default'}
          className="relative group"
          style={{ width: 360, maxWidth: '90vw' }}
        >
          <div className="grid gap-1 pr-6">
            <ToastTitle>{props.title}</ToastTitle>
            {props.description ? <ToastDescription>{props.description}</ToastDescription> : null}
          </div>
          <ToastClose
            aria-label="Close"
            onClick={() => hotToast.dismiss(t.id)}
            style={{ opacity: 1, position: 'absolute', top: '8px', right: '8px' }}
            className="hover:opacity-80"
          >
            ×
          </ToastClose>
        </ToastCard>
      </div>
    ),
    options
  ) as unknown as string;

  return {
    id,
    dismiss: () => hotToast.dismiss(id),
  };
}
