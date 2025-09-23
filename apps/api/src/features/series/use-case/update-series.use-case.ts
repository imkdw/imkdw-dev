import { SeriesValidator } from '@/shared/validator/series.validator';
import { UpdateSeriesDto } from '@/features/series/dto/update-series.dto';
import { Series } from '@/shared/domain/series/series';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateSeriesUseCase {
  constructor(
    private readonly seriesValidator: SeriesValidator,
    private readonly seriesRepository: SeriesRepository,
    private readonly tagRepository: TagRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(id: string, dto: UpdateSeriesDto): Promise<void> {
    return this.prisma.$transaction(async tx => {
      const existingSeries = await this.seriesValidator.checkExist(id, tx);
      await this.seriesValidator.checkExistTitle(dto.title, id, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const updatedSeries = Series.create({
        id: existingSeries.id,
        title: dto.title,
        slug: existingSeries.slug,
        description: dto.description,
        articleCount: existingSeries.articleCount,
        totalReadMinute: existingSeries.totalReadMinute,
        lastArticleCreatedAt: existingSeries.lastArticleCreatedAt,
        tagIds: tags.map(tag => tag.id),
        createdAt: existingSeries.createdAt,
      });

      await this.seriesRepository.update(id, updatedSeries, tx);
    });
  }
}
