import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { SeriesValidator } from '@/shared/validator/series.validator';

@Injectable()
export class SeriesStatsService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly seriesRepository: SeriesRepository,
    private readonly seriesValidator: SeriesValidator
  ) {}

  async recalculateSeries(seriesId: string, tx: Prisma.TransactionClient): Promise<void> {
    const series = await this.seriesValidator.checkExist(seriesId, tx);
    const articles = await this.articleRepository.findBySeriesId(seriesId, tx);

    const updatedSeries = series.recalculateStats(articles);

    await this.seriesRepository.update(seriesId, updatedSeries, tx);
  }
}
