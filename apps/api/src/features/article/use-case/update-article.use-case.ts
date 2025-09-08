import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly seriesValidator: SeriesValidator,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(id: string, dto: UpdateArticleDto): Promise<void> {
    const existingArticle = await this.articleValidator.checkExist(id);

    await this.articleValidator.checkExistTitle(dto.title, id);
    await this.seriesValidator.checkExist(dto.seriesId);

    const updatedArticle = Article.create({
      id: existingArticle.id,
      title: dto.title,
      slug: existingArticle.slug,
      content: dto.content,
      seriesId: dto.seriesId,
      viewCount: existingArticle.viewCount,
      createdAt: existingArticle.createdAt,
      deletedAt: null,
    });

    await this.articleRepository.save(updatedArticle);
  }
}
