import { ArticleController } from '@/features/blog/article/controller/article.controller';
import { CreateArticleUseCase } from '@/features/blog/article/use-case/create-article.use-case';
import { ArticleValidator } from '@/features/blog/article/validator/article.validator';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArticleController],
  providers: [ArticleValidator, CreateArticleUseCase],
})
export class BlogModule {}
