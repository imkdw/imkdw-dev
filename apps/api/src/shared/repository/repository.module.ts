import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { MemberRepository } from './member/member.repository';
import { ArticleRepository } from './article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';

const providers = [MemberRepository, ArticleRepository, SeriesRepository];

@Global()
@Module({
  imports: [DatabaseModule],
  providers,
  exports: providers,
})
export class RepositoryModule {}
