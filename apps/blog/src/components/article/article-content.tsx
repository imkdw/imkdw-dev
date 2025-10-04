import { ReactNode } from 'react';

interface Props {
  content: ReactNode;
}

export function ArticleContent({ content }: Props) {
  return <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">{content}</article>;
}
