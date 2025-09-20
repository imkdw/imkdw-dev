'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <HotToaster
      position="bottom-right"
      gutter={20}
      reverseOrder={false}
      toastOptions={{
        duration: 100000000,
        style: {
          background: 'transparent',
          color: 'inherit',
          border: 'none',
          boxShadow: 'none',
          padding: 0,
          width: '360px',
          maxWidth: '90vw',
        },
      }}
      containerClassName="fixed bottom-4 right-4 z-[100] flex flex-col items-end space-y-2"
    />
  );
}
