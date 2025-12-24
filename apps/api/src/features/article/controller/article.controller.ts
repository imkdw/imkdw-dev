import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto, ResponseCreateArticleDto } from '@/features/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { RequestGetArticlesDto, ResponseGetArticlesDto } from '@/features/article/dto/get-articles.dto';
import { ResponseGetArticleDto } from '@/features/article/dto/get-article.dto';
import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { IncrementViewCountUseCase } from '@/features/article/use-case/increment-view-count.use-case';
import { DeleteArticleUseCase } from '@/features/article/use-case/delete-article.use-case';
import { GetArticlesQuery } from '@/features/article/query/get-articles.query';
import { GetArticleQuery } from '@/features/article/query/get-article.query';
import * as Swagger from '@/features/article/swagger/article.swagger';
import { MemberRoles } from '@/common/decorator/member-role.decorator';
import { MEMBER_ROLE, API_ENDPOINTS } from '@imkdw-dev/consts';
import { Public } from '@/common/decorator/public.decorator';
import { CurrentRequester } from '@/common/decorator/current-requester.decorator';
import { Requester } from '@/common/types/requester.type';

const { GET_ARTICLES, GET_ARTICLE, CREATE_ARTICLE, UPDATE_ARTICLE, INCREMENT_VIEW_COUNT, DELETE_ARTICLE } =
  API_ENDPOINTS;

@ApiTags('게시글')
@Controller()
@MemberRoles(MEMBER_ROLE.ADMIN)
export class ArticleController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly incrementViewCountUseCase: IncrementViewCountUseCase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
    private readonly getArticlesQuery: GetArticlesQuery,
    private readonly getArticleQuery: GetArticleQuery
  ) {}

  @Swagger.getArticles('게시글 목록 조회')
  @Public()
  @Get(GET_ARTICLES)
  async getArticles(
    @Query() query: RequestGetArticlesDto,
    @CurrentRequester() requester?: Requester
  ): Promise<ResponseGetArticlesDto> {
    return this.getArticlesQuery.execute(query, requester);
  }

  @Swagger.getArticle('게시글 상세 조회')
  @Public()
  @Get(GET_ARTICLE)
  async getArticle(
    @Param('slug') slug: string,
    @CurrentRequester() requester?: Requester
  ): Promise<ResponseGetArticleDto> {
    return this.getArticleQuery.execute(slug, requester);
  }

  @Swagger.createArticle('게시글 생성')
  @Post(CREATE_ARTICLE)
  async createArticle(@Body() dto: CreateArticleDto) {
    const article = await this.createArticleUseCase.execute(dto);
    return ResponseCreateArticleDto.from(article);
  }

  @Swagger.updateArticle('게시글 수정')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(UPDATE_ARTICLE)
  async updateArticle(@Param('slug') slug: string, @Body() dto: UpdateArticleDto): Promise<void> {
    await this.updateArticleUseCase.execute(slug, dto);
  }

  @Swagger.incrementViewCount('게시글 조회수 증가')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Patch(INCREMENT_VIEW_COUNT)
  async incrementViewCount(@Param('slug') slug: string): Promise<void> {
    await this.incrementViewCountUseCase.execute(slug);
  }

  @Swagger.deleteArticle('게시글 삭제')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(DELETE_ARTICLE)
  async deleteArticle(@Param('slug') slug: string): Promise<void> {
    await this.deleteArticleUseCase.execute(slug);
  }
}
