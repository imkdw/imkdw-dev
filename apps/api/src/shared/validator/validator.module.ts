import { Global, Module } from '@nestjs/common';
import { ArticleValidator } from './article.validator';
import { SeriesValidator } from './series.validator';

@Global()
@Module({
  providers: [ArticleValidator, SeriesValidator],
  exports: [ArticleValidator, SeriesValidator],
})
export class ValidatorModule {}
