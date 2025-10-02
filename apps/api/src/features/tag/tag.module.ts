import { Module } from '@nestjs/common';
import { TagController } from '@/features/tag/controller/tag.controller';
import { GetTagListQuery } from '@/features/tag/query/get-tag-list.query';

@Module({
  controllers: [TagController],
  providers: [GetTagListQuery],
})
export class TagModule {}
