import { generateUUID } from '@imkdw-dev/utils';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
import { PrismaService } from '@/infra/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_SERVICE, StorageService } from '@/infra/storage/storage.service';
import { getStoragePath } from '@/infra/storage/function/storage.function';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageService,
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
    private readonly seriesStatsService: SeriesStatsService,
    private readonly prisma: PrismaService
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    const articleId = generateUUID();
    const uploadedImageUrls = await this.copyImages(articleId, dto.uploadedImageUrls);

    return this.prisma.$transaction(async tx => {
      await this.articleValidator.checkExistTitle(dto.title, undefined, tx);
      await this.articleValidator.checkExistSlug(dto.slug, tx);
      await this.seriesValidator.checkExist(dto.seriesId, tx);

      const tags = await this.tagRepository.findOrCreateMany(dto.tags, tx);

      const article = Article.create({
        id: articleId,
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        plainContent: dto.content,
        seriesId: dto.seriesId,
        viewCount: 0,
        readMinute: Article.calculateReadMinute(dto.content),
        tagIds: tags.map(tag => tag.id),
        createdAt: new Date(),
      });

      const createdArticle = await this.articleRepository.create(article, tx);

      await this.seriesStatsService.recalculateSeries(dto.seriesId, tx);

      return createdArticle;
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
