import { generateUUID } from '@/common/utils/string.util';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    await this.articleValidator.checkExistTitle(dto.title);
    await this.articleValidator.checkExistSlug(dto.slug);
    await this.seriesValidator.checkExist(dto.seriesId);

    const article = Article.create({
      id: generateUUID(),
      title: dto.title,
      slug: dto.slug,
      content: dto.content,
      seriesId: dto.seriesId,
      viewCount: 0,
      createdAt: new Date(),
      deletedAt: null,
    });

    return this.articleRepository.create(article);
  }
}
