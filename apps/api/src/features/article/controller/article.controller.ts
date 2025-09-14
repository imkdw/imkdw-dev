import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto, ResponseCreateArticleDto } from '@/features/article/dto/create-article.dto';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { IncrementViewCountUseCase } from '@/features/article/use-case/increment-view-count.use-case';
import * as Swagger from '@/features/article/swagger/article.swagger';
import { MemberRoles } from '@/common/decorator/member-role.decorator';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { Public } from '@/common/decorator/public.decorator';

@ApiTags('게시글')
@Controller('articles')
@MemberRoles(MEMBER_ROLE.ADMIN)
export class ArticleController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly incrementViewCountUseCase: IncrementViewCountUseCase
  ) {}

  @Swagger.createArticle('게시글 생성')
  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    const article = await this.createArticleUseCase.execute(dto);
    return ResponseCreateArticleDto.from(article);
  }

  @Swagger.updateArticle('게시글 수정')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() dto: UpdateArticleDto): Promise<void> {
    await this.updateArticleUseCase.execute(id, dto);
  }

  @Swagger.incrementViewCount('게시글 조회수 증가')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Patch(':id/view-count')
  async incrementViewCount(@Param('id') id: string): Promise<void> {
    await this.incrementViewCountUseCase.execute(id);
  }
}
