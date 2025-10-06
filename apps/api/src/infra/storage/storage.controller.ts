import { STORAGE_SERVICE, StorageService } from '@/infra/storage/storage.service';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { RequestGetUploadUrlQuery } from '@/infra/storage/dto/get-upload-url.dto';
import * as Swagger from '@/infra/storage/swagger/storage.swagger';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorator/public.decorator';

const { GET_UPLOAD_URL } = API_ENDPOINTS;

@ApiTags('스토리지')
@Controller()
// TODO: 임시 퍼블릭 데코레이터 제거
@Public()
export class StorageController {
  constructor(@Inject(STORAGE_SERVICE) private readonly storageService: StorageService) {}

  @Swagger.getUploadUrl('파일 업로드용 URL 발급')
  @Get(GET_UPLOAD_URL)
  async getUploadUrl(@Query() { fileName, extension }: RequestGetUploadUrlQuery) {
    const { pathPrefix, uploadUrl } = await this.storageService.getTempUploadUrl(fileName, extension);
    return { url: uploadUrl, pathPrefix };
  }
}
