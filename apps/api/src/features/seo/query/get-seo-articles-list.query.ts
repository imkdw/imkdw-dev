import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { SeoArticleDto } from '@/features/seo/dto/seo-article.dto';

@Injectable()
export class GetSeoArticlesListQuery {
  constructor(private readonly prisma: PrismaService) {}

  async execute(): Promise<SeoArticleDto[]> {
    const articles = await this.prisma.article.findMany({
      where: { deletedAt: null },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return articles;
  }
}
