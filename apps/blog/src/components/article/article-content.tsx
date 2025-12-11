import { IArticleDto } from '@imkdw-dev/types';
import { highlightCodeBlocks } from '@imkdw-dev/utils/server';
import { CodeBlockHydrator } from './code-block-hydrator';

interface Props {
  article: IArticleDto;
}

export function ArticleContent({ article }: Props) {
  const highlightedHtml = highlightCodeBlocks(article.content);

  return (
    <article className="milkdown w-full">
      <div className="w-full" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      <CodeBlockHydrator containerSelector=".milkdown" />
    </article>
  );
}
