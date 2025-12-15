import { generateUUID } from '@imkdw-dev/utils';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CopyImageService } from '@/shared/services/image/copy-image.service';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly seriesStatsService: SeriesStatsService,
    private readonly prisma: PrismaService,
    private readonly copyImageService: CopyImageService
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    const { content, seriesId, slug, title, uploadedImageUrls, state } = dto;

    const articleId = generateUUID();

    const urlMapping = await this.copyImageService.copyMultiple(uploadedImageUrls, [
      { id: articleId, prefix: 'article' },
    ]);
    const updatedContent = this.copyImageService.replaceImagesInContent(content, urlMapping);

    return this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(title, undefined, tx);
      await this.articleValidator.checkExistSlug(slug, tx);
      await this.seriesValidator.checkExist(seriesId, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const article = Article.create({
        id: articleId,
        title: dto.title,
        slug: dto.slug,
        content: updatedContent,
        plainContent: updatedContent,
        seriesId,
        viewCount: 0,
        readMinute: Article.calculateReadMinute(updatedContent),
        state,
        tagIds: tags.map(tag => tag.id),
        createdAt: new Date(),
      });

      const createdArticle = await this.articleRepository.create(article, tx);

      await this.seriesStatsService.recalculateSeries(seriesId, tx);

      return createdArticle;
    });
  }
}
