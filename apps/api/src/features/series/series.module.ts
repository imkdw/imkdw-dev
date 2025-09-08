import { Module } from '@nestjs/common';
import { SeriesController } from '@/features/series/controller/series.controller';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { GetSeriesUseCase } from '@/features/series/use-case/get-series.use-case';
import { SeriesRepository } from '@/shared/repository/series/series.repository';

@Module({
  controllers: [SeriesController],
  providers: [CreateSeriesUseCase, UpdateSeriesUseCase, GetSeriesUseCase, SeriesRepository],
})
export class SeriesModule {}
