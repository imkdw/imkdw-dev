import sharp from 'sharp';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_CANVAS_WIDTH = 4096;
const MAX_CANVAS_HEIGHT = 4096;
const MAX_PADDING_Y = 200;
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const PROCESSING_TIMEOUT_MS = 30_000;

const DEFAULT_BRIGHTNESS = 1;
const MIN_BRIGHTNESS = 0.5;
const MAX_BRIGHTNESS = 1.5;

const DEFAULT_GAMMA = 1;
const MIN_GAMMA = 0.5;
const MAX_GAMMA = 2.5;

const MAGIC_BYTES: Record<string, { offset: number; bytes: number[] }> = {
  'image/png': { offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] },
  'image/jpeg': { offset: 0, bytes: [0xff, 0xd8, 0xff] },
  'image/webp': { offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] },
};

function hexToRgba(hex: string): { r: number; g: number; b: number; alpha: number } {
  const cleaned = hex.replace('#', '');
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
    alpha: 1,
  };
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();

    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      return Response.json({ error: '파일이 필요합니다' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return Response.json({ error: '파일 크기가 4MB를 초과합니다' }, { status: 413 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return Response.json({ error: '지원하지 않는 이미지 형식입니다' }, { status: 400 });
    }

    const widthRaw = formData.get('width');
    const heightRaw = formData.get('height');
    const width = widthRaw !== null ? parseInt(String(widthRaw), 10) : NaN;
    const height = heightRaw !== null ? parseInt(String(heightRaw), 10) : NaN;

    if (!width || !height || width < 1 || height < 1) {
      return Response.json({ error: '가로·세로 크기는 1 이상의 정수여야 합니다' }, { status: 400 });
    }

    if (width > MAX_CANVAS_WIDTH || height > MAX_CANVAS_HEIGHT) {
      return Response.json({ error: '캔버스 크기는 4096px 이하여야 합니다' }, { status: 400 });
    }

    const canvas = { width, height };

    const paddingYRaw = formData.get('paddingY');
    const parsedPaddingY = paddingYRaw !== null ? parseInt(String(paddingYRaw), 10) || 10 : 10;
    const paddingY = Math.min(Math.max(parsedPaddingY, 0), MAX_PADDING_Y, Math.floor((canvas.height - 1) / 2));

    const backgroundRaw = formData.get('background');
    const backgroundHex =
      typeof backgroundRaw === 'string' && /^#[0-9A-Fa-f]{6}$/.test(backgroundRaw.trim())
        ? backgroundRaw.trim()
        : '#FFFFFF';
    const background = hexToRgba(backgroundHex);

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const brightnessRaw = formData.get('brightness');
    const parsedBrightness = brightnessRaw !== null ? Number.parseFloat(String(brightnessRaw)) : NaN;
    const brightness = clampNumber(
      Number.isFinite(parsedBrightness) ? parsedBrightness : DEFAULT_BRIGHTNESS,
      MIN_BRIGHTNESS,
      MAX_BRIGHTNESS
    );

    const gammaRaw = formData.get('gamma');
    const parsedGamma = gammaRaw !== null ? Number.parseFloat(String(gammaRaw)) : NaN;
    const gamma = clampNumber(Number.isFinite(parsedGamma) ? parsedGamma : DEFAULT_GAMMA, MIN_GAMMA, MAX_GAMMA);

    const magicDef = MAGIC_BYTES[file.type];
    if (magicDef) {
      const headerBytes = fileBuffer.subarray(magicDef.offset, magicDef.offset + magicDef.bytes.length);
      const isValid = magicDef.bytes.every((b, i) => headerBytes[i] === b);
      if (!isValid) {
        return Response.json({ error: '파일 내용이 확장자와 일치하지 않습니다' }, { status: 400 });
      }
    }

    const maxHeight = canvas.height - paddingY * 2;
    if (maxHeight < 1) {
      return Response.json({ error: '여백이 너무 커서 이미지를 배치할 수 없습니다' }, { status: 400 });
    }

    const processImage = async () => {
      const trimmed = await sharp(fileBuffer).trim().toBuffer({ resolveWithObject: true });

      let pipeline = sharp(trimmed.data).resize({
        width: canvas.width,
        height: maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      });

      if (gamma !== DEFAULT_GAMMA) {
        pipeline = pipeline.gamma(gamma);
      }

      if (brightness !== DEFAULT_BRIGHTNESS) {
        pipeline = pipeline.modulate({ brightness });
      }

      const resized = await pipeline.toBuffer({ resolveWithObject: true });

      const left = Math.round((canvas.width - resized.info.width) / 2);
      const top = Math.round((canvas.height - resized.info.height) / 2);
      return sharp({
        create: { width: canvas.width, height: canvas.height, channels: 4, background },
      })
        .composite([{ input: resized.data, left, top }])
        .webp()
        .toBuffer();
    };

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), PROCESSING_TIMEOUT_MS);
    });

    let buffer: Buffer;
    try {
      buffer = await Promise.race([processImage(), timeoutPromise]);
    } catch (err) {
      if (err instanceof Error && err.message === 'TIMEOUT') {
        return Response.json({ error: '이미지 처리 시간이 초과되었습니다' }, { status: 503 });
      }
      throw err;
    }

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/webp',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': 'inline; filename="composed.webp"',
      },
    });
  } catch {
    return Response.json({ error: '이미지 처리 중 오류가 발생했습니다' }, { status: 500 });
  }
}
