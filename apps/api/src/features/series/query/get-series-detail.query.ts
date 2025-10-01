import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { SeriesDetailDto } from '@/features/series/dto/get-series-detail.dto';
import { SeriesTagDto } from '@/features/series/dto/series-tag.dto';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';

@Injectable()
export class GetSeriesDetailQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(slug: string): Promise<SeriesDetailDto> {
    const series = await this.prisma.series.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    });

    if (!series) {
      throw new SeriesNotFoundException(`slug가 ${slug}인 시리즈를 찾을 수 없습니다.`);
    }

    return {
      id: series.id,
      slug: series.slug,
      title: series.title,
      description: series.description,
      articleCount: series.articleCount,
      totalReadMinute: series.totalReadMinute,
      lastArticleCreatedAt: series.lastArticleCreatedAt,
      createdAt: series.createdAt,
      tags: series.tags.map(
        (st): SeriesTagDto => ({
          id: st.tag.id,
          name: st.tag.name,
        })
      ),
    };
  }
}
