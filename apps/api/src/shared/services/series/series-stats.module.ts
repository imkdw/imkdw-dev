import { Global, Module } from '@nestjs/common';
import { SeriesStatsService } from './series-stats.service';
import { RepositoryModule } from '@/shared/repository/repository.module';

@Global()
@Module({
  imports: [RepositoryModule],
  providers: [SeriesStatsService],
  exports: [SeriesStatsService],
})
export class SeriesStatsModule {}
