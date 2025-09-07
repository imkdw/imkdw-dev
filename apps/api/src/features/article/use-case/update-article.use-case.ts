import { ArticleValidator } from '@/features/article/validator/article.validator';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(id: string, dto: UpdateArticleDto): Promise<void> {
    const existingArticle = await this.articleValidator.checkExist(id);

    await this.articleValidator.checkExistTitle(dto.title, id);

    const updatedArticle = Article.create({
      id: existingArticle.id,
      title: dto.title,
      content: dto.content,
      createdAt: existingArticle.createdAt,
      deletedAt: null,
    });

    await this.articleRepository.save(updatedArticle);
  }
}
