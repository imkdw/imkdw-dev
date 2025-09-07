import { ArticleController } from '@/features/article/controller/article.controller';
import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { ArticleValidator } from '@/features/article/validator/article.validator';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArticleController],
  providers: [ArticleValidator, CreateArticleUseCase, UpdateArticleUseCase],
})
export class ArticleModule {}
