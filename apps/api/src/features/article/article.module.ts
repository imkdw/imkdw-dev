import { ArticleController } from '@/features/article/controller/article.controller';
import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArticleController],
  providers: [CreateArticleUseCase, UpdateArticleUseCase],
})
export class ArticleModule {}
