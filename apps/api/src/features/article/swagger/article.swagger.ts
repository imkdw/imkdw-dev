import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function createArticle(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: CreateArticleDto }));
}

export function updateArticle(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: UpdateArticleDto }),
    ApiResponse({ status: HttpStatus.NO_CONTENT, description: '게시글이 성공적으로 수정되었습니다' })
  );
}

export function incrementViewCount(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiNoContentResponse({ description: '조회수가 성공적으로 증가되었습니다' })
  );
}
