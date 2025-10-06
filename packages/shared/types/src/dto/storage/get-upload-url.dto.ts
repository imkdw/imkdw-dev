export interface IRequestGetUploadUrlDto {
  /**
   * 파일명
   */
  fileName: string;

  /**
   * 파일 확장자
   */
  extension: string;
}

export interface IResponseGetUploadUrlDto {
  /**
   * S3 Presigned URL
   */
  url: string;

  /**
   * 파일 업로드 경로 접두사
   */
  pathPrefix: string;
}
