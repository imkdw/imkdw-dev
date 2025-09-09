import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(id: string, dto: UpdateArticleDto): Promise<void> {
    await this.prisma.$transaction(async tx => {
      const existingArticle = await this.articleValidator.checkExist(id, tx);

      await this.articleValidator.checkExistTitle(dto.title, id, tx);
      await this.seriesValidator.checkExist(dto.seriesId, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const updatedArticle = Article.create({
        id: existingArticle.id,
        title: dto.title,
        slug: existingArticle.slug,
        content: dto.content,
        seriesId: dto.seriesId,
        viewCount: existingArticle.viewCount,
        tagIds: tags.map(tag => tag.id),
        createdAt: existingArticle.createdAt,
      });

      await this.articleRepository.save(updatedArticle, tx);
    });
  }
}
