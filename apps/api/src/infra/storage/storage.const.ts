export const FILE_EXTENSIONS = {
  JPEG: 'jpeg',
  JPG: 'jpg',
  PNG: 'png',
  WEBP: 'webp',
  PLAIN_TEXT: 'txt',
} as const;
export type FileExtension = (typeof FILE_EXTENSIONS)[keyof typeof FILE_EXTENSIONS];

export const STORAGE_CONTENT_TYPE: Record<FileExtension, string> = {
  [FILE_EXTENSIONS.JPEG]: 'image/jpeg',
  [FILE_EXTENSIONS.JPG]: 'image/jpeg',
  [FILE_EXTENSIONS.PNG]: 'image/png',
  [FILE_EXTENSIONS.WEBP]: 'image/webp',
  [FILE_EXTENSIONS.PLAIN_TEXT]: 'text/plain',
};
