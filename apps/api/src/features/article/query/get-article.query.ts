import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { ArticleDto, ArticleNavigationDto, ResponseGetArticleDto } from '@/features/article/dto/get-article.dto';
import { ArticleTagDto } from '@/features/article/dto/get-articles.dto';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';

@Injectable()
export class GetArticleQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string): Promise<ResponseGetArticleDto> {
    const article = await this.prisma.article.findUnique({
      where: { id, deletedAt: null },
      include: {
        series: true,
        tags: {
          include: { tag: true },
        },
      },
    });

    if (!article) {
      throw new ArticleNotFoundException('게시글을 찾을 수 없습니다');
    }

    const [prevArticle, nextArticle] = await Promise.all([
      this.findPrevArticle(article.seriesId, article.createdAt),
      this.findNextArticle(article.seriesId, article.createdAt),
    ]);

    const articleDetail: ArticleDto = {
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.content,
      viewCount: article.viewCount,
      readMinute: article.readMinute,
      createdAt: article.createdAt,
      series: {
        id: article.series.id,
        title: article.series.title,
        slug: article.series.slug,
      },
      tags: article.tags.map(
        (at): ArticleTagDto => ({
          id: at.tag.id,
          name: at.tag.name,
        })
      ),
    };

    return {
      article: articleDetail,
      prevArticle,
      nextArticle,
    };
  }

  private async findPrevArticle(seriesId: string, createdAt: Date): Promise<ArticleNavigationDto | null> {
    const prevArticle = await this.prisma.article.findFirst({
      where: {
        seriesId,
        deletedAt: null,
        createdAt: { lt: createdAt },
      },
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, slug: true },
    });

    return prevArticle;
  }

  private async findNextArticle(seriesId: string, createdAt: Date): Promise<ArticleNavigationDto | null> {
    const nextArticle = await this.prisma.article.findFirst({
      where: {
        seriesId,
        deletedAt: null,
        createdAt: { gt: createdAt },
      },
      orderBy: { createdAt: 'asc' },
      select: { id: true, title: true, slug: true },
    });

    return nextArticle;
  }
}
