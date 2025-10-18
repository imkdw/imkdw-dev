import { STORAGE_SERVICE, StorageService } from '@/infra/storage/storage.service';
import { Inject, Injectable } from '@nestjs/common';

interface GetPathParams {
  id: string;
  prefix: string;
}

@Injectable()
export class CopyImageService {
  constructor(@Inject(STORAGE_SERVICE) private readonly storageService: StorageService) {}

  /**
   * 단일 이미지 파일 복사
   */
  async copySingle(imageUrl: string, basePath: string): Promise<string> {
    const fileName = imageUrl.split('/').pop() ?? '';
    const destinationPath = `${basePath}/${fileName}`;
    return this.storageService.copyTempFile(fileName, destinationPath);
  }

  /**
   * 여러 이미지 파일 일괄 복사
   */
  async copyMultiple(uploadedImageUrls: string[], pathSegments: GetPathParams[]): Promise<Map<string, string>> {
    const urlMap = new Map<string, string>();

    await Promise.all(
      uploadedImageUrls.map(async oldUrl => {
        const path = this.getStoragePath(pathSegments);
        const fileName = oldUrl.split('/').pop() ?? '';
        const destinationPath = `${path}/${fileName}`;

        const newUrl = await this.storageService.copyTempFile(fileName, destinationPath);
        urlMap.set(oldUrl, newUrl);
      })
    );

    return urlMap;
  }

  /**
   * HTML 본문 내의 이미지 URL 교체
   * presigned URL을 origin URL로 치환
   */
  replaceImagesInContent(content: string, urlMapping: Map<string, string>): string {
    let updatedContent = content;

    urlMapping.forEach((newUrl, oldUrl) => {
      const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedOldUrl, 'g');
      updatedContent = updatedContent.replace(regex, newUrl);
    });

    return updatedContent;
  }

  /**
   * 스토리지 경로 생성
   * @example
   * ```ts
   * const path = this.getStoragePath([{ id: '123', prefix: 'test' }]);
   * // => 'test/123'
   * ```
   */
  private getStoragePath(params: GetPathParams[]): string {
    const path = params.reduce((acc, param) => `${acc}/${param.prefix}/${param.id}`, '').slice(1);
    return `${path}`.replaceAll('//', '/');
  }
}
