import sharp from 'sharp';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function hexToRgba(hex: string): { r: number; g: number; b: number; alpha: number } {
  const cleaned = hex.replace('#', '');
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
    alpha: 1,
  };
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

    const widthRaw = formData.get('width');
    const heightRaw = formData.get('height');
    const width = widthRaw !== null ? parseInt(String(widthRaw), 10) : NaN;
    const height = heightRaw !== null ? parseInt(String(heightRaw), 10) : NaN;

    if (!width || !height || width < 1 || height < 1) {
      return Response.json({ error: '가로·세로 크기는 1 이상의 정수여야 합니다' }, { status: 400 });
    }

    const canvas = { width, height };

    const paddingYRaw = formData.get('paddingY');
    const paddingY = paddingYRaw !== null ? (parseInt(String(paddingYRaw), 10) || 10) : 10;

    const backgroundRaw = formData.get('background');
    const backgroundHex = typeof backgroundRaw === 'string' && backgroundRaw.trim() !== '' ? backgroundRaw : '#FFFFFF';
    const background = hexToRgba(backgroundHex);

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const trimmed = await sharp(fileBuffer).trim().toBuffer({ resolveWithObject: true });


    const maxWidth = canvas.width;
    const maxHeight = canvas.height - paddingY * 2;
    const resized = await sharp(trimmed.data)
      .resize({ width: maxWidth, height: maxHeight, fit: 'inside', withoutEnlargement: true })
      .toBuffer({ resolveWithObject: true });

    const left = Math.round((canvas.width - resized.info.width) / 2);
    const top = Math.round((canvas.height - resized.info.height) / 2);
    const buffer = await sharp({
      create: { width: canvas.width, height: canvas.height, channels: 4, background },
    })
      .composite([{ input: resized.data, left, top }])
      .webp()
      .toBuffer();

    return new Response(new Uint8Array(buffer), { headers: { 'Content-Type': 'image/webp' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : '서버 내부 오류가 발생했습니다';
    return Response.json({ error: message }, { status: 500 });
  }
}
