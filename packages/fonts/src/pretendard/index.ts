import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: './woff2/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: './woff2/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
});
