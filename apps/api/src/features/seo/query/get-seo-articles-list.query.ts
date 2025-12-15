import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { SeoArticleDto } from '@/features/seo/dto/seo-article.dto';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

@Injectable()
export class GetSeoArticlesListQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<SeoArticleDto[]> {
    const articles = await this.prisma.article.findMany({
      where: {
        deletedAt: null,
        state: ARTICLE_STATE.NORMAL,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return articles;
  }
}
