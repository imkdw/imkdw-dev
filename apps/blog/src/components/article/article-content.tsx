import { IArticleDto } from '@imkdw-dev/types';
import { highlightCodeBlocks } from '@imkdw-dev/utils/server';
import { CodeBlockHydrator } from './code-block-hydrator';
import { ImageZoomHydrator } from './image-zoom-hydrator';
import { LinkPreviewHydrator } from './link-preview';

interface CodeBlockTranslations {
  copySuccess: string;
  copyFailed: string;
}

interface ImageZoomTranslations {
  close: string;
  zoomIn: string;
  zoomOut: string;
}

interface Props {
  article: IArticleDto;
  codeBlockTranslations: CodeBlockTranslations;
  imageZoomTranslations: ImageZoomTranslations;
}

export function ArticleContent({ article, codeBlockTranslations, imageZoomTranslations }: Props) {
  const highlightedHtml = highlightCodeBlocks(article.content);

  return (
    <article className="milkdown w-full">
      <div className="w-full" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      <CodeBlockHydrator containerSelector=".milkdown" translations={codeBlockTranslations} />
      <ImageZoomHydrator containerSelector=".milkdown" translations={imageZoomTranslations} />
      <LinkPreviewHydrator containerSelector=".milkdown" />
    </article>
  );
}
