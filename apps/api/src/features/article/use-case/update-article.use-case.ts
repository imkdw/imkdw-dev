import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE, StorageService } from '@/infra/storage/storage.service';
import { getStoragePath } from '@/infra/storage/function/storage.function';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageService,
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly seriesStatsService: SeriesStatsService,
    private readonly prisma: PrismaService
  ) {}

  async execute(slug: string, dto: UpdateArticleDto): Promise<void> {
    const existingArticle = await this.articleValidator.checkExistBySlug(slug);

    await this.copyImages(existingArticle.id, dto.uploadedImageUrls);

    await this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(dto.title, existingArticle.id, tx);
      await this.seriesValidator.checkExist(dto.seriesId, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const updatedArticle = Article.create({
        id: existingArticle.id,
        title: dto.title,
        slug: existingArticle.slug,
        content: dto.content,
        plainContent: dto.content,
        seriesId: dto.seriesId,
        viewCount: existingArticle.viewCount,
        readMinute: Article.calculateReadMinute(dto.content),
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

  async copyImages(articleId: string, uploadedImageUrls: string[]) {
    return Promise.all(
      uploadedImageUrls.map(url => {
        const path = getStoragePath([{ id: articleId, prefix: 'article' }]);
        const fileName = url.split('/').pop() ?? '';
        const destinationPath = `${path}/${fileName}`;
        return this.storageService.copyTempFile(fileName, destinationPath);
      })
    );
  }
}
