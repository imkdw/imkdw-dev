type WebpQualityInput = number | `${number}%`;

export interface ConvertToWebpOptions {
  quality?: WebpQualityInput;
  maxOutputBytes?: number;
  maxOutputBytesErrorMessage?: (actualBytes: number, maxOutputBytes: number) => string;
}

const DEFAULT_WEBP_QUALITY = 1;

function normalizeWebpQuality(quality: WebpQualityInput | undefined): number {
  if (quality === undefined) {
    return DEFAULT_WEBP_QUALITY;
  }

  const parsedQuality =
    typeof quality === 'string'
      ? Number.parseFloat(quality.trim().replace('%', '')) / 100
      : quality > 1
        ? quality / 100
        : quality;

  if (!Number.isFinite(parsedQuality) || parsedQuality < 0 || parsedQuality > 1) {
    throw new Error('WebP 품질 값이 올바르지 않습니다. 0~1 사이 소수 또는 0%~100% 퍼센트를 사용하세요.');
  }

  return parsedQuality;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes}B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function convertCanvasToWebpBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          reject(new Error('Canvas를 WebP로 변환하지 못했습니다'));
          return;
        }

        resolve(blob);
      },
      'image/webp',
      quality
    );
  });
}

async function createWebpBlob(bitmap: ImageBitmap, quality: number): Promise<Blob> {
  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Canvas를 생성할 수 없습니다');
    }

    ctx.drawImage(bitmap, 0, 0);
    return canvas.convertToBlob({ type: 'image/webp', quality });
  }

  if (typeof document === 'undefined') {
    throw new Error('Canvas를 생성할 수 없습니다');
  }

  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas를 생성할 수 없습니다');
  }

  ctx.drawImage(bitmap, 0, 0);
  return convertCanvasToWebpBlob(canvas, quality);
}

export async function convertToWebp(file: File, options: ConvertToWebpOptions = {}): Promise<File> {
  const quality = normalizeWebpQuality(options.quality);
  const bitmap = await createImageBitmap(file);

  try {
    const blob = await createWebpBlob(bitmap, quality);

    if (options.maxOutputBytes !== undefined && blob.size > options.maxOutputBytes) {
      const message =
        options.maxOutputBytesErrorMessage?.(blob.size, options.maxOutputBytes) ??
        `변환된 WebP 결과(${formatBytes(blob.size)})가 제한(${formatBytes(options.maxOutputBytes)})을 초과합니다`;
      throw new Error(message);
    }

    const name = file.name.replace(/\.[^.]+$/, '.webp');
    return new File([blob], name, { type: 'image/webp' });
  } finally {
    bitmap.close();
  }
}
