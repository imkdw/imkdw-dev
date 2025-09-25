import { ArticleController } from '@/features/article/controller/article.controller';
import { ArticleCommentController } from '@/features/article/controller/article-comment.controller';
import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { IncrementViewCountUseCase } from '@/features/article/use-case/increment-view-count.use-case';
import { DeleteArticleUseCase } from '@/features/article/use-case/delete-article.use-case';
import { CreateArticleCommentUseCase } from '@/features/article/use-case/create-article-comment.use-case';
import { UpdateArticleCommentUseCase } from '@/features/article/use-case/update-article-comment.use-case';
import { DeleteArticleCommentUseCase } from '@/features/article/use-case/delete-article-comment.use-case';
import { CreateArticleReplyUseCase } from '@/features/article/use-case/create-article-reply.use-case';
import { GetArticlesQuery } from '@/features/article/query/get-articles.query';
import { SeriesStatsModule } from '@/shared/services/series/series-stats.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SeriesStatsModule],
  controllers: [ArticleController, ArticleCommentController],
  providers: [
    CreateArticleUseCase,
    UpdateArticleUseCase,
    IncrementViewCountUseCase,
    DeleteArticleUseCase,
    CreateArticleCommentUseCase,
    UpdateArticleCommentUseCase,
    DeleteArticleCommentUseCase,
    CreateArticleReplyUseCase,
    GetArticlesQuery,
  ],
})
export class ArticleModule {}
