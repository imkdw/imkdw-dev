import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagDto } from '@/features/tag/dto/get-tag-list.dto';
import { GetTagListQuery } from '@/features/tag/query/get-tag-list.query';
import * as Swagger from '@/features/tag/swagger/tag.swagger';
import { Public } from '@/common/decorator/public.decorator';
import { API_ENDPOINTS } from '@imkdw-dev/consts';

const { GET_TAG_LIST } = API_ENDPOINTS;

@ApiTags('태그')
@Controller()
export class TagController {
  constructor(private readonly getTagListQuery: GetTagListQuery) {}

  @Swagger.getTagList('태그 목록 조회')
  @Public()
  @Get(GET_TAG_LIST)
  async getTagList(): Promise<TagDto[]> {
    return this.getTagListQuery.execute();
  }
}
