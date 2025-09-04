import { generateUUID } from '@/common/utils/string.util';
import { ArticleValidator } from '@/features/article/validator/article.validator';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { Article } from '@/shared/domain/article/article';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateArticleUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(dto: CreateArticleDto): Promise<Article> {
    await this.articleValidator.checkExistTitle(dto.title);

    const article = Article.create({
      id: generateUUID(),
      title: dto.title,
      content: dto.content,
      createdAt: new Date(),
      deletedAt: null,
    });

    return this.articleRepository.create(article);
  }
}
