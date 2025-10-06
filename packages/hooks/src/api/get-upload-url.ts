import { apiClient } from '@imkdw-dev/api-client';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { IResponseGetUploadUrlDto } from '@imkdw-dev/types';

export async function getUploadUrl(fileName: string, extension: string): Promise<IResponseGetUploadUrlDto> {
  return apiClient.get<IResponseGetUploadUrlDto>(API_ENDPOINTS.GET_UPLOAD_URL, {
    query: { fileName, extension },
  });
}
