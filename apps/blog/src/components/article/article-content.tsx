import { IArticleDto } from '@imkdw-dev/types';
import { highlightCodeBlocks } from '@imkdw-dev/utils';

interface Props {
  article: IArticleDto;
}

export function ArticleContent({ article }: Props) {
  const highlightedHtml = highlightCodeBlocks(article.content);

  return (
    <article className="milkdown-editor">
      <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    </article>
  );
}
