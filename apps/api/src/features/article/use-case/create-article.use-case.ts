import { generateUUID } from '@/common/utils/string.util';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly prisma: PrismaService
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    return this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(dto.title, undefined, tx);
      await this.articleValidator.checkExistSlug(dto.slug, tx);
      await this.seriesValidator.checkExist(dto.seriesId, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const article = Article.create({
        id: generateUUID(),
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        seriesId: dto.seriesId,
        viewCount: 0,
        readMinute: Article.calculateReadMinute(dto.content),
        tagIds: tags.map(tag => tag.id),
        createdAt: new Date(),
      });

      return this.articleRepository.create(article, tx);
    });
  }
}
