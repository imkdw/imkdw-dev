import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateArticleCommentUseCase } from '@/features/article/use-case/create-article-comment.use-case';
import { UpdateArticleCommentUseCase } from '@/features/article/use-case/update-article-comment.use-case';
import { DeleteArticleCommentUseCase } from '@/features/article/use-case/delete-article-comment.use-case';
import { CreateArticleReplyUseCase } from '@/features/article/use-case/create-article-reply.use-case';
import { CreateArticleCommentDto } from '@/features/article/dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from '@/features/article/dto/update-article-comment.dto';
import * as Swagger from '@/features/article/swagger/article-comment.swagger';
import { CurrentRequester } from '@/common/decorator/current-requester.decorator';
import { Requester } from '@/common/types/requester.type';
import { API_ENDPOINTS } from '@imkdw-dev/consts';

const { CREATE_ARTICLE_COMMENT, UPDATE_ARTICLE_COMMENT, DELETE_ARTICLE_COMMENT, CREATE_ARTICLE_REPLY } = API_ENDPOINTS;

@ApiTags('게시글 댓글')
@Controller()
export class ArticleCommentController {
  constructor(
    private readonly createArticleCommentUseCase: CreateArticleCommentUseCase,
    private readonly updateArticleCommentUseCase: UpdateArticleCommentUseCase,
    private readonly deleteArticleCommentUseCase: DeleteArticleCommentUseCase,
    private readonly createArticleReplyUseCase: CreateArticleReplyUseCase
  ) {}

  @Swagger.createComment('댓글 생성')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post(CREATE_ARTICLE_COMMENT)
  async createComment(
    @Param('articleId') articleId: string,
    @Body() dto: CreateArticleCommentDto,
    @CurrentRequester() requester: Requester
  ): Promise<void> {
    await this.createArticleCommentUseCase.execute(articleId, dto, requester.id);
  }

  @Swagger.updateComment('댓글 수정')
  @Put(UPDATE_ARTICLE_COMMENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: UpdateArticleCommentDto,
    @CurrentRequester() requester: Requester
  ): Promise<void> {
    await this.updateArticleCommentUseCase.execute(commentId, dto, requester);
  }

  @Swagger.deleteComment('댓글 삭제')
  @Delete(DELETE_ARTICLE_COMMENT)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('commentId') commentId: string, @CurrentRequester() requester: Requester): Promise<void> {
    await this.deleteArticleCommentUseCase.execute(commentId, requester);
  }

  @Swagger.createReply('답글 생성')
  @Post(CREATE_ARTICLE_REPLY)
  @HttpCode(HttpStatus.NO_CONTENT)
  async createReply(
    @Param('articleId') articleId: string,
    @Param('commentId') commentId: string,
    @Body() dto: CreateArticleCommentDto,
    @CurrentRequester() requester: Requester
  ): Promise<void> {
    await this.createArticleReplyUseCase.execute(articleId, commentId, dto, requester.id);
  }
}
