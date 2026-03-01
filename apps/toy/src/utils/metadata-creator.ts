import { Metadata } from 'next';

interface Params {
  title: string;
  description: string;
}

export function createMetadata(params: Params): Metadata {
  const { title, description } = params;

  const images = [
    {
      url: `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
      width: 1200,
      height: 630,
    },
  ];

  return {
    ...params,
    openGraph: {
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
