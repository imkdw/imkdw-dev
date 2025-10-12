import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { Public } from '@/common/decorator/public.decorator';
import { GetSeoSeriesListQuery } from '@/features/seo/query/get-seo-series-list.query';
import { GetSeoArticlesListQuery } from '@/features/seo/query/get-seo-articles-list.query';
import { SeoSeriesDto } from '@/features/seo/dto/seo-series.dto';
import { SeoArticleDto } from '@/features/seo/dto/seo-article.dto';
import * as Swagger from '@/features/seo/swagger/seo.swagger';

const { GET_SEO_SERIES_LIST, GET_SEO_ARTICLES_LIST } = API_ENDPOINTS;

@ApiTags('SEO')
@Controller()
@Public()
export class SeoController {
  constructor(
    private readonly getSeoSeriesListQuery: GetSeoSeriesListQuery,
    private readonly getSeoArticlesListQuery: GetSeoArticlesListQuery
  ) {}

  @Swagger.getSeoSeriesList('SEO용 시리즈 목록 조회')
  @Get(GET_SEO_SERIES_LIST)
  async getSeoSeriesList(): Promise<SeoSeriesDto[]> {
    return this.getSeoSeriesListQuery.execute();
  }

  @Swagger.getSeoArticlesList('SEO용 게시글 목록 조회')
  @Get(GET_SEO_ARTICLES_LIST)
  async getSeoArticlesList(): Promise<SeoArticleDto[]> {
    return this.getSeoArticlesListQuery.execute();
  }
}
