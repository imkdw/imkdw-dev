import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { ResponseGetStatsDto } from '@/features/stats/dto/get-stats.dto';

@Injectable()
export class GetStatsQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<ResponseGetStatsDto> {
    const [articleCount, totalViewCount, seriesCount, tagCount] = await Promise.all([
      this.prisma.article.count({ where: { deletedAt: null } }),
      this.prisma.article.aggregate({ where: { deletedAt: null }, _sum: { viewCount: true } }),
      this.prisma.series.count({ where: { deletedAt: null } }),
      this.prisma.tag.count({ where: { deletedAt: null } }),
    ]);

    return {
      article: { count: articleCount, viewCount: totalViewCount._sum.viewCount ?? 0 },
      series: { count: seriesCount },
      tag: { count: tagCount },
    };
  }
}
