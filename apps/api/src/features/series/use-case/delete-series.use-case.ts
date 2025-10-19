import { SeriesValidator } from '@/shared/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteSeriesUseCase {
  constructor(
    private readonly seriesValidator: SeriesValidator,
    private readonly seriesRepository: SeriesRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(slug: string): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const existingSeries = await this.seriesValidator.checkExistBySlug(slug, tx);
      await this.seriesRepository.delete(existingSeries.id);
    });
  }
}
