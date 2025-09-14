import { Global, Module } from '@nestjs/common';
import { ArticleValidator } from './article.validator';
import { ArticleCommentValidator } from './article-comment.validator';
import { SeriesValidator } from './series.validator';

@Global()
@Module({
  providers: [ArticleValidator, ArticleCommentValidator, SeriesValidator],
  exports: [ArticleValidator, ArticleCommentValidator, SeriesValidator],
})
export class ValidatorModule {}
