import { getApiClient } from '../instance';
import { API_ENDPOINTS } from '@imkdw-dev/consts';
import { IResponseGetUploadUrlDto } from '@imkdw-dev/types';
import { withErrorHandling } from '../lib/error-handler';

export const getUploadUrl = withErrorHandling(
  async (fileName: string, extension: string): Promise<IResponseGetUploadUrlDto> => {
    return getApiClient().get<IResponseGetUploadUrlDto>(API_ENDPOINTS.GET_UPLOAD_URL, {
      query: { fileName, extension },
    });
  }
);
