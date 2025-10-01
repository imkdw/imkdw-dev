import { Module } from '@nestjs/common';
import { SeriesController } from '@/features/series/controller/series.controller';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { GetSeriesListQuery } from '@/features/series/query/get-series-list.query';
import { GetSeriesDetailQuery } from '@/features/series/query/get-series-detail.query';

@Module({
  controllers: [SeriesController],
  providers: [CreateSeriesUseCase, UpdateSeriesUseCase, GetSeriesListQuery, GetSeriesDetailQuery],
})
export class SeriesModule {}
