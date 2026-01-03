import { IArticleDto } from '@imkdw-dev/types';
import { highlightCodeBlocks } from '@imkdw-dev/utils/server';
import { CodeBlockHydrator } from './code-block-hydrator';
import { ImageZoomHydrator } from './image-zoom-hydrator';
import { LinkPreviewHydrator } from './link-preview';

interface Props {
  article: IArticleDto;
}

export function ArticleContent({ article }: Props) {
  const highlightedHtml = highlightCodeBlocks(article.content);

  return (
    <article className="milkdown w-full">
      <div className="w-full" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      <CodeBlockHydrator containerSelector=".milkdown" />
      <ImageZoomHydrator containerSelector=".milkdown" />
      <LinkPreviewHydrator containerSelector=".milkdown" />
    </article>
  );
}
