import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { createOffset, getOffsetPagingResult } from '@/common/function/offset-paging.function';
import {
  GetSeriesListDto,
  ResponseGetSeriesListDto,
  SeriesListItemDto,
} from '@/features/series/dto/get-series-list.dto';

@Injectable()
export class GetSeriesListQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(params: GetSeriesListDto): Promise<ResponseGetSeriesListDto> {
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

    const series = items.map(
      (item): SeriesListItemDto => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
      })
    );

    return getOffsetPagingResult({ items: series, totalCount, limit, page });
  }
}
