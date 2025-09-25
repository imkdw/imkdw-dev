import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { createOffset, getOffsetPagingResult } from '@/common/function/offset-paging.function';
import { GetArticlesDto, ResponseGetArticlesDto, ArticleListItemDto } from '@/features/article/dto/get-articles.dto';

@Injectable()
export class GetArticlesQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(params: GetArticlesDto): Promise<ResponseGetArticlesDto> {
    const { limit, page } = params;
    const { offset } = createOffset(limit, page);

    const [items, totalCount] = await Promise.all([
      this.prisma.article.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        include: { series: true },
      }),
      this.prisma.article.count({ where: { deletedAt: null } }),
    ]);

    const articles = items.map(
      (item): ArticleListItemDto => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        viewCount: item.viewCount,
        readMinute: item.readMinute,
        createdAt: item.createdAt,
        series: {
          id: item.series.id,
          title: item.series.title,
          slug: item.series.slug,
        },
      })
    );

    return getOffsetPagingResult({ items: articles, totalCount, limit, page });
  }
}
