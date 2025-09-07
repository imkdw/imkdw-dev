import { Module } from '@nestjs/common';
import { SeriesController } from '@/features/series/controller/series.controller';
import { CreateSeriesUseCase } from '@/features/series/use-case/create-series.use-case';
import { UpdateSeriesUseCase } from '@/features/series/use-case/update-series.use-case';
import { SeriesValidator } from '@/features/series/validator/series.validator';
import { SeriesRepository } from '@/shared/repository/series/series.repository';

@Module({
  controllers: [SeriesController],
  providers: [CreateSeriesUseCase, UpdateSeriesUseCase, SeriesValidator, SeriesRepository],
})
export class SeriesModule {}
