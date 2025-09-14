import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { MemberRepository } from './member/member.repository';
import { ArticleRepository } from './article/article.repository';
import { ArticleCommentRepository } from './article-comment/article-comment.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { TagRepository } from './tag/tag.repository';

const providers = [MemberRepository, ArticleRepository, ArticleCommentRepository, SeriesRepository, TagRepository];

@Global()
@Module({
  imports: [DatabaseModule],
  providers,
  exports: providers,
})
export class RepositoryModule {}
