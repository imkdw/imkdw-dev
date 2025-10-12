import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { SeoSeriesDto } from '@/features/seo/dto/seo-series.dto';

@Injectable()
export class GetSeoSeriesListQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<SeoSeriesDto[]> {
    const series = await this.prisma.series.findMany({
      where: { deletedAt: null },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return series;
  }
}
