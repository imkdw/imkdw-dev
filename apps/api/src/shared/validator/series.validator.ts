import { ExistSeriesTitleException } from '@/features/series/exception/exist-series-title.exception';
import { ExistSeriesSlugException } from '@/features/series/exception/exist-series-slug.exception';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeriesValidator {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async checkExistTitle(title: string, excludeId?: string, tx?: Prisma.TransactionClient): Promise<void> {
    const series = await this.seriesRepository.findByTitle(title, tx);

    if (series && series.id !== excludeId) {
      throw new ExistSeriesTitleException(`${title}은 이미 존재하는 시리즈 제목입니다`);
    }
  }

  async checkExistSlug(slug: string, excludeId?: string, tx?: Prisma.TransactionClient): Promise<void> {
    const series = await this.seriesRepository.findBySlug(slug, tx);

    if (series && series.id !== excludeId) {
      throw new ExistSeriesSlugException(`${slug}는 이미 존재하는 시리즈 슬러그입니다`);
    }
  }

  async checkExist(id: string, tx?: Prisma.TransactionClient) {
    const series = await this.seriesRepository.findById(id, tx);

    if (!series) {
      throw new SeriesNotFoundException(`시리즈를 찾을 수 없습니다`);
    }

    return series;
  }
}
