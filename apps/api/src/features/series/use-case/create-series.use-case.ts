import { SeriesValidator } from '@/shared/validator/series.validator';
import { CreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { Series } from '@/shared/domain/series/series';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { Injectable } from '@nestjs/common';
import { generateUUID } from '@/common/utils/string.util';

@Injectable()
export class CreateSeriesUseCase {
  constructor(
    private readonly seriesValidator: SeriesValidator,
    private readonly seriesRepository: SeriesRepository
  ) {}

  async execute(dto: CreateSeriesDto): Promise<Series> {
    await this.seriesValidator.checkExistTitle(dto.title);
    await this.seriesValidator.checkExistSlug(dto.slug);

    const series = Series.create({
      id: generateUUID(),
      title: dto.title,
      slug: dto.slug,
      createdAt: new Date(),
      deletedAt: null,
    });

    return await this.seriesRepository.create(series);
  }
}
