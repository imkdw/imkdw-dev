import { SUPPORTED_IMAGE_EXTENSIONS } from '@imkdw-dev/consts';
import { ImageUploadError, ImageUploadResult } from './types/image-upload.type';
import { generateUUID } from '@imkdw-dev/utils';
import { getUploadUrl } from '@imkdw-dev/actions';

export const useImageUpload = () => {
  const createError = (code: ImageUploadError['code'], message: string, originalError?: unknown): ImageUploadError => {
    return { code, message, originalError };
  };

  const validateFile = (file: File): ImageUploadError | null => {
    if (!SUPPORTED_IMAGE_EXTENSIONS.includes(file.type)) {
      return createError(
        'INVALID_FILE_TYPE',
        `지원하지 않는 파일 형식입니다. 지원 형식: ${SUPPORTED_IMAGE_EXTENSIONS.join(', ')}`
      );
    }
    return null;
  };

  const uploadToS3 = async (url: string, file: File): Promise<void> => {
    try {
      const response = await fetch(url, { method: 'PUT', body: file });

      if (!response.ok) {
        throw new Error(`HTTP 상태 코드: ${response.status}`);
      }
    } catch (error) {
      throw createError('UPLOAD_FAILED', 'S3 이미지 업로드에 실패했습니다.', error);
    }
  };

  const uploadImage = async (file: File): Promise<ImageUploadResult> => {
    try {
      const validationError = validateFile(file);
      if (validationError) {
        return { success: false, error: validationError };
      }

      const fileName = generateUUID();
      const extension = file.type.split('/')[1] ?? 'jpeg';

      const { pathPrefix, url } = await getUploadUrl(fileName, extension);

      await uploadToS3(url, file);

      const imageUrl = `${pathPrefix}/${fileName}.${extension}`;
      return { success: true, data: imageUrl };
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        return { success: false, error: error as ImageUploadError };
      }

      return {
        success: false,
        error: createError('API_ERROR', '이미지 업로드 중 예상치 못한 오류가 발생했습니다.', error),
      };
    }
  };

  return { uploadImage };
};
