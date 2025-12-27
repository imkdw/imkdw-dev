import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { RssArticleDto } from '@/features/seo/dto/rss-article.dto';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

@Injectable()
export class GetSeoRssQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<RssArticleDto[]> {
    const articles = await this.prisma.article.findMany({
      where: {
        deletedAt: null,
        state: ARTICLE_STATE.NORMAL,
      },
      select: {
        title: true,
        slug: true,
        plainContent: true,
        createdAt: true,
        series: {
          select: {
            title: true,
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return articles.map(article => ({
      title: article.title,
      slug: article.slug,
      plainContent: article.plainContent,
      createdAt: article.createdAt,
      seriesTitle: article.series.title,
      tagNames: article.tags.map(at => at.tag.name),
    }));
  }
}
