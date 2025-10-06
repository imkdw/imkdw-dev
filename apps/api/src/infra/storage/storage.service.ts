import { GetUploadUrlReturn, UploadParams } from '@/infra/storage/storage.type';

export const STORAGE_SERVICE = Symbol('STORAGE_SERVICE');

export interface StorageService {
  /**
   * 파일 업로드
   */
  upload(params: UploadParams): Promise<string>;

  /**
   * 임시 파일 업로드 URL 발급
   */
  getTempUploadUrl(fileName: string, extension: string): Promise<GetUploadUrlReturn>;

  /**
   * 임시 파일을 특정 경로로 복사
   */
  copyTempFile(fileName: string, destinationPath: string): Promise<string>;
}
