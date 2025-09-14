import { Global, Module } from '@nestjs/common';
import { ArticleValidator } from './article.validator';
import { ArticleCommentValidator } from './article-comment.validator';
import { MemberValidator } from './member.validator';
import { SeriesValidator } from './series.validator';

@Global()
@Module({
  providers: [ArticleValidator, ArticleCommentValidator, MemberValidator, SeriesValidator],
  exports: [ArticleValidator, ArticleCommentValidator, MemberValidator, SeriesValidator],
})
export class ValidatorModule {}
