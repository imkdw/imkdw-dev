import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { createOffset, getOffsetPagingResult } from '@/common/function/offset-paging.function';
import {
  ArticleListItemDto,
  ArticleTagDto,
  RequestGetArticlesDto,
  ResponseGetArticlesDto,
} from '@/features/article/dto/get-articles.dto';
import { ARTICLE_MAX_CONTENT_LENGTH_FOR_LIST, ARTICLE_STATE } from '@imkdw-dev/consts';
import { Requester } from '@/common/types/requester.type';

@Injectable()
export class GetArticlesQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(params: RequestGetArticlesDto, requester?: Requester): Promise<ResponseGetArticlesDto> {
    const { limit, page, seriesId } = params;
    const { offset } = createOffset(limit, page);

    const isAdmin = requester?.isAdmin ?? false;

    const whereCondition = {
      deletedAt: null,
      ...(seriesId && { seriesId }),
      ...(!isAdmin && { state: ARTICLE_STATE.NORMAL }),
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
        plainContent: item.plainContent.slice(0, ARTICLE_MAX_CONTENT_LENGTH_FOR_LIST),
        viewCount: item.viewCount,
        readMinute: item.readMinute,
        state: item.state,
        createdAt: item.createdAt,
        series: {
          id: item.series.id,
          title: item.series.title,
          slug: item.series.slug,
        },
        tags: item.tags.map(
          (tag): ArticleTagDto => ({
            id: tag.tag.id,
            name: tag.tag.name,
          })
        ),
      })
    );

    return getOffsetPagingResult({ items: articles, totalCount, limit, page });
  }
}
