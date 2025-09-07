import { SeriesValidator } from '@/features/series/validator/series.validator';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { Series } from '@/shared/domain/series/series';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateSeriesUseCase {
  constructor(
    private readonly seriesValidator: SeriesValidator,
    private readonly seriesRepository: SeriesRepository
  ) {}

  async execute(id: string, dto: UpdateSeriesDto): Promise<void> {
    const existingSeries = await this.seriesValidator.checkExist(id);

    if (dto.title) {
      await this.seriesValidator.checkExistTitle(dto.title, id);
    }

    if (dto.slug) {
      await this.seriesValidator.checkExistSlug(dto.slug, id);
    }

    const updatedSeries = Series.create({
      id: existingSeries.id,
      title: dto.title ?? existingSeries.title,
      slug: dto.slug ?? existingSeries.slug,
      createdAt: existingSeries.createdAt,
      deletedAt: existingSeries.deletedAt,
    });

    await this.seriesRepository.update(id, updatedSeries);
  }
}