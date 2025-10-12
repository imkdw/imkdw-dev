import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SeoSeriesDto } from '@/features/seo/dto/seo-series.dto';
import { SeoArticleDto } from '@/features/seo/dto/seo-article.dto';

export function getSeoSeriesList(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ type: [SeoSeriesDto], description: 'SEO용 시리즈 목록이 성공적으로 조회되었습니다' })
  );
}

export function getSeoArticlesList(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({ type: [SeoArticleDto], description: 'SEO용 게시글 목록이 성공적으로 조회되었습니다' })
  );
}
