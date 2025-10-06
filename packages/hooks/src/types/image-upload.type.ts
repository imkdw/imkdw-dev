export interface ImageUploadError {
  code: 'INVALID_FILE_TYPE' | 'UPLOAD_FAILED' | 'API_ERROR';
  message: string;
  originalError?: unknown;
}

export interface ImageUploadResult {
  success: boolean;
  data?: string;
  error?: ImageUploadError;
}
