import { Injectable } from '@nestjs/common';
import { Series } from '@/shared/domain/series/series';
import { SeriesRepository } from '@/shared/repository/series/series.repository';

@Injectable()
export class GetSeriesUseCase {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async execute(): Promise<Series[]> {
    return await this.seriesRepository.findAll();
  }
}