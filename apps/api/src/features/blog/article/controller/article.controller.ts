import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Swagger from '@/features/blog/article/swagger/article.swagger';
import { CreateArticleDto } from '@/features/blog/article/dto/create-article.dto';

@ApiTags('게시글')
@Controller('articles')
export class ArticleController {
  constructor() {}

  @Swagger.createArticle('게시글 생성')
  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {}
}
