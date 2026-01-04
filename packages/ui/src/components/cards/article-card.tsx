import { GitBranch, Calendar, Clock, Eye } from 'lucide-react';
import { TagList } from './tag-list';
import { MetaInfoItem } from './meta-info-item';
import { ArticleStateBadge } from './article-state-badge';
import { IArticleListItemDto } from '@imkdw-dev/types';
import { formatReadTime } from '@imkdw-dev/utils';
import { LinkComponentType } from '../../types';

interface Props {
  article: IArticleListItemDto;
  LinkComponent?: LinkComponentType;
}

export function ArticleCard({ article, LinkComponent = 'a' as unknown as LinkComponentType }: Props) {
  const publishedAt = new Date(article.createdAt).toLocaleDateString('ko-KR');
  const tags = article.tags.map(tag => tag.name);
  const { title, plainContent, series, slug } = article;
  const LinkTag = LinkComponent;

  return (
    <article className="h-full">
      <LinkTag href={`/articles/${slug}`} className="h-full">
        <div className="rounded-xl p-2 group h-full flex flex-col bg-gradient-to-br from-card via-card to-muted/30 border-2 border-border/60 hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300">
          <div className="flex flex-col flex-1 p-3 md:p-4">
            <div className="flex items-center justify-between pb-2 md:pb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-primary/10 via-primary/5 to-accent/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/15 transition-all duration-200">
                <GitBranch className="h-3 w-3" />
                <span className="text-sm font-medium text-primary">{series.title}</span>
              </div>
              <ArticleStateBadge state={article.state} />
            </div>
            <h3 className="text-base md:text-lg font-bold leading-tight smooth-transition truncate pb-3">{title}</h3>
            <p className="text-muted-foreground mb-2 md:mb-3 text-md leading-relaxed line-clamp-3 flex-1 min-h-[80px]">
              {plainContent}
            </p>
            <TagList tags={tags} maxVisible={3} variant="custom" className="mb-2 md:mb-3" />
            <div className="flex gap-4 text-muted-foreground">
              <MetaInfoItem icon={<Calendar className="h-3 w-3" />} text={publishedAt} />
              <MetaInfoItem icon={<Clock className="h-3 w-3" />} text={formatReadTime(article.readMinute)} />
              <MetaInfoItem icon={<Eye className="h-3 w-3" />} text={article.viewCount.toLocaleString()} />
            </div>
          </div>
        </div>
      </LinkTag>
    </article>
  );
}
