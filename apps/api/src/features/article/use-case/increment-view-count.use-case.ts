import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IncrementViewCountUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(slug: string): Promise<void> {
    const article = await this.articleValidator.checkExistBySlug(slug);
    await this.articleRepository.incrementViewCount(article);
  }
}
