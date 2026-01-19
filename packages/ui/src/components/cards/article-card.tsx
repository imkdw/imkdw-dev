import { GitBranch, Calendar, Clock, Eye } from 'lucide-react';
import { TagList } from './tag-list';
import { MetaInfoItem } from './meta-info-item';
import { ArticleStateBadge } from './article-state-badge';
import { IArticleListItemDto } from '@imkdw-dev/types';
import { formatReadTime } from '@imkdw-dev/utils';
import { LinkComponentType } from '../../types';
import { Locale } from '@imkdw-dev/i18n';

interface Props {
  article: IArticleListItemDto;
  LinkComponent: LinkComponentType;
  locale: Locale;
}

export function ArticleCard({ article, LinkComponent, locale }: Props) {
  const publishedAt = new Date(article.createdAt).toLocaleDateString('ko-KR');
  const tags = article.tags.map(tag => tag.name);
  const { title, plainContent, series, slug } = article;

  return (
    <article className="h-full">
      <LinkComponent href={`/articles/${slug}`} className="h-full">
        <div className="rounded-xl p-2 group h-full flex flex-col bg-card border-2 border-border/60 hover:border-primary/30 transition-all duration-300">
          <div className="flex flex-col flex-1 p-3 md:p-4">
            <div className="flex items-center justify-between pb-2 md:pb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 hover:border-primary/40 hover:bg-primary/15 transition-all duration-200">
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
              <MetaInfoItem icon={<Clock className="h-3 w-3" />} text={formatReadTime(article.readMinute, locale)} />
              <MetaInfoItem icon={<Eye className="h-3 w-3" />} text={article.viewCount.toLocaleString()} />
            </div>
          </div>
        </div>
      </LinkComponent>
    </article>
  );
}
