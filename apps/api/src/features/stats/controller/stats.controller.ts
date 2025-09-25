import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseGetStatsDto } from '@/features/stats/dto/get-stats.dto';
import { GetStatsQuery } from '@/features/stats/query/get-stats.query';
import * as Swagger from '@/features/stats/swagger/stats.swagger';
import { Public } from '@/common/decorator/public.decorator';
import { API_ENDPOINTS } from '@imkdw-dev/consts';

const { GET_STATS } = API_ENDPOINTS;

@ApiTags('통계')
@Controller()
export class StatsController {
  constructor(private readonly getStatsQuery: GetStatsQuery) {}

  @Swagger.getStats('통계 정보 조회')
  @Public()
  @Get(GET_STATS)
  async getStats(): Promise<ResponseGetStatsDto> {
    return this.getStatsQuery.execute();
  }
}
