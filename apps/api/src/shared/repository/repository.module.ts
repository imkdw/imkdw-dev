import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { MemberRepository } from './member/member.repository';
import { ArticleRepository } from './article/article.repository';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [MemberRepository, ArticleRepository],
  exports: [MemberRepository, ArticleRepository],
})
export class RepositoryModule {}
