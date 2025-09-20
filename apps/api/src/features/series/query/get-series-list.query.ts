import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { Series } from '@/shared/domain/series/series';
import { SeriesMapper } from '@/shared/mapper/series/series.mapper';
import { createOffset, getOffsetPagingResult } from '@/common/function/offset-paging.function';
import { GetSeriesListDto } from '@/features/series/dto/get-series-list.dto';

interface GetSeriesListResult {
  items: Series[];
  totalPage: number;
  haveNext: boolean;
  havePrev: boolean;
  totalCount: number;
}

@Injectable()
export class GetSeriesListQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(params: GetSeriesListDto): Promise<GetSeriesListResult> {
    const { limit, page } = params;
    const { offset } = createOffset(limit, page);

    const [items, totalCount] = await Promise.all([
      this.prisma.series.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      this.prisma.series.count({
        where: { deletedAt: null },
      }),
    ]);

    const series = items.map(item => SeriesMapper.toDomain(item));

    return getOffsetPagingResult({
      items: series,
      totalCount,
      limit,
      page,
    });
  }
}
