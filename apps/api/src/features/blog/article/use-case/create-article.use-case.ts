import { CreateArticleDto } from '@/features/blog/article/dto/create-article.dto';
import { ArticleValidator } from '@/features/blog/article/validator/article.validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateArticleUseCase {
  constructor(private readonly articleValidator: ArticleValidator) {}

  async execute(dto: CreateArticleDto) {}
}
