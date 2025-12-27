import { Module } from '@nestjs/common';
import { SeoController } from '@/features/seo/controller/seo.controller';
import { GetSeoSeriesListQuery } from '@/features/seo/query/get-seo-series-list.query';
import { GetSeoArticlesListQuery } from '@/features/seo/query/get-seo-articles-list.query';
import { GetSeoRssQuery } from '@/features/seo/query/get-seo-rss.query';

@Module({
  controllers: [SeoController],
  providers: [GetSeoSeriesListQuery, GetSeoArticlesListQuery, GetSeoRssQuery],
})
export class SeoModule {}
