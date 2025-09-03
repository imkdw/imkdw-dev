import { CreateArticleDto } from '@/features/blog/article/dto/create-article.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

export function createArticle(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: CreateArticleDto }));
}
