import { Module } from '@nestjs/common';
import { SeoController } from '@/features/seo/controller/seo.controller';
import { GetSeoSeriesListQuery } from '@/features/seo/query/get-seo-series-list.query';
import { GetSeoArticlesListQuery } from '@/features/seo/query/get-seo-articles-list.query';

@Module({
  controllers: [SeoController],
  providers: [GetSeoSeriesListQuery, GetSeoArticlesListQuery],
})
export class SeoModule {}
