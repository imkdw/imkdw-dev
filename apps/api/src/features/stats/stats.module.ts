import { Module } from '@nestjs/common';
import { StatsController } from '@/features/stats/controller/stats.controller';
import { GetStatsQuery } from '@/features/stats/query/get-stats.query';

@Module({
  controllers: [StatsController],
  providers: [GetStatsQuery],
})
export class StatsModule {}