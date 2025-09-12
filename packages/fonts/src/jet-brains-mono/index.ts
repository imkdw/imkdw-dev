import localFont from 'next/font/local';

export const jetBrainsMono = localFont({
  src: [
    {
      path: './woff2/JetBrainsMono-Regular.woff2',
      weight: '400',
    },
    {
      path: './woff2/JetBrainsMono-Bold.woff2',
      weight: '700',
    },
  ],
});
