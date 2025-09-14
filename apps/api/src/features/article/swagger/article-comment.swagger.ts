import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from '@/features/article/dto/update-article-comment.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export function createComment(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateArticleCommentDto }),
    ApiNoContentResponse({ description: '댓글이 성공적으로 생성되었습니다' })
  );
}

export function updateComment(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: UpdateArticleCommentDto }),
    ApiNoContentResponse({ description: '댓글이 성공적으로 수정되었습니다' })
  );
}

export function deleteComment(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiNoContentResponse({ description: '댓글이 성공적으로 삭제되었습니다' })
  );
}

export function createReply(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: CreateArticleCommentDto }),
    ApiNoContentResponse({ description: '답글이 성공적으로 생성되었습니다' })
  );
}
