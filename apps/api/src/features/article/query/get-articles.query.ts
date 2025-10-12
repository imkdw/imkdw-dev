import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { createOffset, getOffsetPagingResult } from '@/common/function/offset-paging.function';
import {
  ArticleListItemDto,
  ArticleTagDto,
  RequestGetArticlesDto,
  ResponseGetArticlesDto,
} from '@/features/article/dto/get-articles.dto';
import { ARTICLE_MAX_CONTENT_LENGTH_FOR_LIST } from '@imkdw-dev/consts';

@Injectable()
export class GetArticlesQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(params: RequestGetArticlesDto): Promise<ResponseGetArticlesDto> {
    const { limit, page, seriesId } = params;
    const { offset } = createOffset(limit, page);

    const whereCondition = {
      deletedAt: null,
      ...(seriesId && { seriesId }),
    };

    const [items, totalCount] = await Promise.all([
      this.prisma.article.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        include: {
          series: true,
          tags: {
            include: { tag: true },
          },
        },
      }),
      this.prisma.article.count({ where: whereCondition }),
    ]);

    const articles = items.map(
      (item): ArticleListItemDto => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: item.plainContent.slice(0, ARTICLE_MAX_CONTENT_LENGTH_FOR_LIST),
        viewCount: item.viewCount,
        readMinute: item.readMinute,
        createdAt: item.createdAt,
        series: {
          id: item.series.id,
          title: item.series.title,
          slug: item.series.slug,
        },
        tags: item.tags.map(
          (at): ArticleTagDto => ({
            id: at.tag.id,
            name: at.tag.name,
          })
        ),
      })
    );

    return getOffsetPagingResult({ items: articles, totalCount, limit, page });
  }
}
