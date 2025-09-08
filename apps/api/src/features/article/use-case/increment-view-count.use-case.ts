import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IncrementViewCountUseCase {
  constructor(
    private readonly articleValidator: ArticleValidator,
    private readonly articleRepository: ArticleRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.articleValidator.checkExist(id);
    await this.articleRepository.incrementViewCount(id);
  }
}
