import { SeriesValidator } from '@/shared/validator/series.validator';
import { CreateSeriesDto } from '@/features/series/dto/create-series.dto';
import { Series } from '@/shared/domain/series/series';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { generateUUID } from '@/common/utils/string.util';

@Injectable()
export class CreateSeriesUseCase {
  constructor(
    private readonly seriesValidator: SeriesValidator,
    private readonly seriesRepository: SeriesRepository,
    private readonly tagRepository: TagRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(dto: CreateSeriesDto): Promise<Series> {
    return this.prisma.$transaction(async tx => {
      await this.seriesValidator.checkExistTitle(dto.title, undefined, tx);
      await this.seriesValidator.checkExistSlug(dto.slug, undefined, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const series = Series.create({
        id: generateUUID(),
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        articleCount: 0,
        totalReadMinute: 0,
        lastArticleCreatedAt: null,
        tagIds: tags.map(tag => tag.id),
        createdAt: new Date(),
      });

      return this.seriesRepository.create(series, tx);
    });
  }
}
