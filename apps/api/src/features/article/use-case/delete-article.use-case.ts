import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly seriesStatsService: SeriesStatsService,
    private readonly prisma: PrismaService
  ) {}

  async execute(slug: string): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const existingArticle = await this.articleValidator.checkExistBySlug(slug, tx);

      await this.articleRepository.delete(existingArticle.id, tx);

      await this.seriesStatsService.recalculateSeries(existingArticle.seriesId, tx);
    });
  }
}
