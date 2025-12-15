import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CopyImageService } from '@/shared/services/image/copy-image.service';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly seriesStatsService: SeriesStatsService,
    private readonly prisma: PrismaService,
    private readonly copyImageService: CopyImageService
  ) {}

  async execute(slug: string, dto: UpdateArticleDto): Promise<void> {
    const existingArticle = await this.articleValidator.checkExistBySlug(slug);

    const urlMapping = await this.copyImageService.copyMultiple(dto.uploadedImageUrls, [
      { id: existingArticle.id, prefix: 'article' },
    ]);

    const updatedContent = this.copyImageService.replaceImagesInContent(dto.content, urlMapping);

    await this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(dto.title, existingArticle.id, tx);
      await this.seriesValidator.checkExist(dto.seriesId, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const updatedArticle = Article.create({
        id: existingArticle.id,
        title: dto.title,
        slug: existingArticle.slug,
        content: updatedContent,
        plainContent: updatedContent,
        seriesId: dto.seriesId,
        viewCount: existingArticle.viewCount,
        readMinute: Article.calculateReadMinute(updatedContent),
        state: dto.state,
        tagIds: tags.map(tag => tag.id),
        createdAt: existingArticle.createdAt,
      });

      await this.articleRepository.save(updatedArticle, tx);

      if (existingArticle.seriesId !== dto.seriesId) {
        await this.seriesStatsService.recalculateSeries(existingArticle.seriesId, tx);
        await this.seriesStatsService.recalculateSeries(dto.seriesId, tx);
      } else {
        await this.seriesStatsService.recalculateSeries(dto.seriesId, tx);
      }
    });
  }
}
