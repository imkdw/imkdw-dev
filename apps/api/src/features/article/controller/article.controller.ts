import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateArticleDto, ResponseCreateArticleDto } from '@/features/article/dto/create-article.dto';
import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import * as Swagger from '@/features/article/swagger/article.swagger';

@ApiTags('게시글')
@Controller('articles')
export class ArticleController {
  constructor(private readonly createArticleUseCase: CreateArticleUseCase) {}

  @Swagger.createArticle('게시글 생성')
  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    const article = await this.createArticleUseCase.execute(dto);
    return ResponseCreateArticleDto.from(article);
  }
}
