'use client';

import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Card,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@imkdw-dev/ui';
import { Upload, Download, Loader2, X } from 'lucide-react';
import { zipSync } from 'fflate';

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const UPLOAD_SIZE_LIMIT = 4 * 1024 * 1024;
const DEFAULT_BACKGROUND = '#FFFFFF';
const MAX_BATCH_FILES = 50;
const MIN_CANVAS_SIZE = 1;
const MAX_CANVAS_SIZE = 4096;
const MIN_PADDING_Y = 0;
const MAX_PADDING_Y = 200;

const PRESET_DEFAULTS: Record<string, { width: number; height: number; paddingY: number }> = {
  Z: { width: 724, height: 460, paddingY: 20 },
  G: { width: 720, height: 540, paddingY: 15 },
};

interface BatchResult {
  name: string;
  url: string;
}

async function convertToWebp(file: File): Promise<File> {
  if (file.type === 'image/webp' && file.size <= UPLOAD_SIZE_LIMIT) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Canvas를 생성할 수 없습니다');
  }

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.92 });
  if (blob.size > UPLOAD_SIZE_LIMIT) {
    const sizeMB = (blob.size / (1024 * 1024)).toFixed(1);
    const limitMB = (UPLOAD_SIZE_LIMIT / (1024 * 1024)).toFixed(0);
    throw new Error(`WebP 변환 후에도 파일 크기(${sizeMB}MB)가 업로드 제한(${limitMB}MB)을 초과합니다`);
  }

  const name = file.name.replace(/\.[^.]+$/, '.webp');
  return new File([blob], name, { type: 'image/webp' });
}

async function composeImage(
  file: File,
  width: number,
  height: number,
  paddingY: number,
  background: string
): Promise<Blob> {
  const compressed = await convertToWebp(file);
  const formData = new FormData();
  formData.append('file', compressed);
  formData.append('width', String(width));
  formData.append('height', String(height));
  formData.append('paddingY', String(paddingY));
  formData.append('background', background);

  const response = await fetch('/api/image/compose', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error ?? '변환에 실패했습니다');
  }

  return response.blob();
}

export function ComposeForm() {
  const [preset, setPreset] = useState('Z');
  const [canvasWidth, setCanvasWidth] = useState(724);
  const [canvasHeight, setCanvasHeight] = useState(460);
  const [paddingY, setPaddingY] = useState(20);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND);

  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewResult, setPreviewResult] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const previewInputRef = useRef<HTMLInputElement>(null);

  const [previewDragOver, setPreviewDragOver] = useState<boolean>(false);
  const [batchDragOver, setBatchDragOver] = useState<boolean>(false);
  const previewDragCounter = useRef<number>(0);
  const batchDragCounter = useRef<number>(0);

  const lastValidBg = useRef<string>(DEFAULT_BACKGROUND);

  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchError, setBatchError] = useState<string | null>(null);
  const batchInputRef = useRef<HTMLInputElement>(null);

  function handlePresetChange(value: string) {
    setPreset(value);
    const defaults = PRESET_DEFAULTS[value];
    if (defaults) {
      setCanvasWidth(defaults.width);
      setCanvasHeight(defaults.height);
      setPaddingY(defaults.paddingY);
    }
  }

  function handlePreviewFile(newFile: File) {
    if (!newFile.type.startsWith('image/')) {
      return;
    }

    if (newFile.size > MAX_FILE_SIZE) {
      setPreviewError('파일 크기가 25MB를 초과합니다');
      return;
    }

    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }

    if (previewResult) {
      URL.revokeObjectURL(previewResult);
    }

    setPreviewFile(newFile);
    setPreviewSrc(URL.createObjectURL(newFile));
    setPreviewResult(null);
    setPreviewError(null);
  }

  function handlePreviewDrop(e: DragEvent) {
    e.preventDefault();
    previewDragCounter.current = 0;
    setPreviewDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handlePreviewFile(droppedFile);
    }
  }

  function handlePreviewInput(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handlePreviewFile(selectedFile);
    }
  }

  async function handlePreviewSubmit() {
    if (!previewFile) {
      return;
    }
    setPreviewLoading(true);
    setPreviewError(null);
    if (previewResult) {
      URL.revokeObjectURL(previewResult);
      setPreviewResult(null);
    }

    try {
      const blob = await composeImage(previewFile, canvasWidth, canvasHeight, paddingY, background);
      setPreviewResult(URL.createObjectURL(blob));
      setPreviewOpen(true);
    } catch (err) {
      setPreviewError(err instanceof Error ? err.message : '변환에 실패했습니다');
    } finally {
      setPreviewLoading(false);
    }
  }

  function addBatchFiles(rawFiles: File[]) {
    const existingNames = new Set(batchFiles.map(f => f.name));
    const images = rawFiles.filter(f => f.type.startsWith('image/') && !existingNames.has(f.name));
    const oversized = images.filter(f => f.size > MAX_FILE_SIZE);
    const valid = images.filter(f => f.size <= MAX_FILE_SIZE);

    if (oversized.length > 0) {
      setBatchError(`25MB 초과 파일 ${oversized.length}개가 제외되었습니다`);
    } else {
      setBatchError(null);
    }

    const remaining = MAX_BATCH_FILES - batchFiles.length;
    const capped = valid.slice(0, Math.max(remaining, 0));

    if (valid.length > remaining) {
      const oversizedMsg = oversized.length > 0 ? `25MB 초과 파일 ${oversized.length}개가 제외되었습니다. ` : '';
      setBatchError(
        `${oversizedMsg}최대 ${MAX_BATCH_FILES}개까지만 추가할 수 있습니다 (${valid.length - capped.length}개 제외)`
      );
    }

    if (capped.length > 0) {
      setBatchFiles(prev => [...prev, ...capped]);
      setBatchResults([]);
    }
  }

  function handleBatchDrop(e: DragEvent) {
    e.preventDefault();
    batchDragCounter.current = 0;
    setBatchDragOver(false);
    addBatchFiles(Array.from(e.dataTransfer.files));
  }

  function handleBatchInput(e: ChangeEvent<HTMLInputElement>) {
    addBatchFiles(Array.from(e.target.files ?? []));
    e.target.value = '';
  }

  function removeBatchFile(index: number) {
    setBatchFiles(prev => prev.filter((_, i) => i !== index));
  }

  function clearBatch() {
    batchResults.forEach(r => URL.revokeObjectURL(r.url));
    setBatchFiles([]);
    setBatchResults([]);
    setBatchError(null);
    setBatchProgress(0);
  }

  async function handleBatchSubmit() {
    if (batchFiles.length === 0) {
      return;
    }
    setBatchLoading(true);
    setBatchError(null);
    batchResults.forEach(r => URL.revokeObjectURL(r.url));
    setBatchResults([]);
    setBatchProgress(0);

    try {
      const results: BatchResult[] = [];
      for (let i = 0; i < batchFiles.length; i++) {
        const file = batchFiles[i];
        if (!file) {
          continue;
        }
        const blob = await composeImage(file, canvasWidth, canvasHeight, paddingY, background);
        const originalName = file.name.replace(/\.[^.]+$/, '');
        results.push({
          name: `${originalName}_${preset}.webp`,
          url: URL.createObjectURL(blob),
        });
        setBatchProgress(i + 1);
      }
      setBatchResults(results);
    } catch (err) {
      setBatchError(err instanceof Error ? err.message : '변환 중 오류가 발생했습니다');
    } finally {
      setBatchLoading(false);
    }
  }

  async function downloadAll() {
    const files: Record<string, Uint8Array> = {};
    await Promise.all(
      batchResults.map(async r => {
        const res = await fetch(r.url);
        const buf = await res.arrayBuffer();
        files[r.name] = new Uint8Array(buf);
      })
    );
    const zipped = zipSync(files);
    const blob = new Blob([new Uint8Array(zipped)], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compose_${preset}.zip`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-5">
        <div>
          <p className="text-lg font-bold">공통 설정</p>
          <p className="mt-1 text-sm text-muted-foreground">미리보기·변환에 모두 적용됩니다</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 items-start">
          <div className="flex flex-col gap-2">
            <Label className="text-base font-bold">프리셋</Label>
            <RadioGroup value={preset} onValueChange={handlePresetChange} className="flex gap-4">
              <RadioGroupItem value="Z">
                <div>
                  <p className="font-medium">Z</p>
                  <p className="text-sm text-muted-foreground">724 × 460</p>
                  <p className="text-xs text-muted-foreground">여백 20px</p>
                </div>
              </RadioGroupItem>
              <RadioGroupItem value="G">
                <div>
                  <p className="font-medium">G</p>
                  <p className="text-sm text-muted-foreground">720 × 540</p>
                  <p className="text-xs text-muted-foreground">여백 15px</p>
                </div>
              </RadioGroupItem>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-base font-bold">캔버스 크기 (px)</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="canvasWidth" className="sr-only">
                가로
              </Label>
              <Input
                id="canvasWidth"
                type="number"
                min={MIN_CANVAS_SIZE}
                max={MAX_CANVAS_SIZE}
                value={canvasWidth}
                onChange={e => setCanvasWidth(Number(e.target.value))}
                className="w-24 ring-1 ring-input"
                placeholder="가로"
              />
              <span className="text-muted-foreground" aria-hidden="true">
                ×
              </span>
              <Input
                id="canvasHeight"
                type="number"
                min={MIN_CANVAS_SIZE}
                max={MAX_CANVAS_SIZE}
                value={canvasHeight}
                onChange={e => setCanvasHeight(Number(e.target.value))}
                className="w-24 ring-1 ring-input"
                placeholder="세로"
                aria-label="세로"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-base font-bold" htmlFor="paddingY">
              상하 여백 (px)
            </Label>
            <Input
              id="paddingY"
              type="number"
              min={MIN_PADDING_Y}
              max={MAX_PADDING_Y}
              value={paddingY}
              onChange={e => setPaddingY(Number(e.target.value))}
              className="w-28 ring-1 ring-input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-base font-bold" htmlFor="background">
              배경색
            </Label>
            <div className="flex items-center gap-2">
              <input
                id="background"
                type="color"
                value={background}
                onChange={e => {
                  const upper = e.target.value.toUpperCase();
                  setBackground(upper);
                  lastValidBg.current = upper;
                }}
                className="h-10 w-10 cursor-pointer rounded border border-input"
              />
              <Input
                value={background}
                onChange={e => setBackground(e.target.value)}
                onBlur={e => {
                  const val = e.target.value;
                  if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                    const upper = val.toUpperCase();
                    setBackground(upper);
                    lastValidBg.current = upper;
                  } else {
                    setBackground(lastValidBg.current);
                  }
                }}
                className="w-28 font-mono ring-1 ring-input"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <p className="text-lg font-bold">① 미리보기</p>
          <p className="text-sm text-muted-foreground">이미지 1장으로 설정을 확인합니다</p>

          <div
            role="button"
            tabIndex={0}
            aria-label="이미지 업로드 영역. 클릭하거나 파일을 드래그하세요"
            onDragOver={e => e.preventDefault()}
            onDragEnter={() => {
              previewDragCounter.current += 1;
              if (previewDragCounter.current === 1) {
                setPreviewDragOver(true);
              }
            }}
            onDragLeave={() => {
              previewDragCounter.current -= 1;
              if (previewDragCounter.current === 0) {
                setPreviewDragOver(false);
              }
            }}
            onDrop={handlePreviewDrop}
            onClick={() => previewInputRef.current?.click()}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                previewInputRef.current?.click();
              }
            }}
            className={cn(
              'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors',
              'border-muted-foreground/25 hover:border-muted-foreground/50',
              previewSrc && 'border-primary/50',
              previewDragOver && 'border-primary bg-primary/5'
            )}
          >
            {previewSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- blob URL
              <img src={previewSrc} alt="원본" className="max-h-36 rounded object-contain" />
            ) : (
              <>
                <Upload className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">이미지 1장을 업로드</p>
              </>
            )}
            <input
              ref={previewInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePreviewInput}
              className="hidden"
            />
          </div>

          <Button onClick={handlePreviewSubmit} disabled={!previewFile || previewLoading} className="w-full">
            {previewLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                처리 중...
              </>
            ) : (
              '미리보기'
            )}
          </Button>

          {previewError && <p className="text-sm text-destructive">{previewError}</p>}

          {previewResult && (
            <Button variant="outline" onClick={() => setPreviewOpen(true)} className="w-full">
              결과 다시 보기
            </Button>
          )}

          <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
            <DialogContent onClose={() => setPreviewOpen(false)} className="max-w-fit">
              <DialogHeader>
                <DialogTitle>미리보기 결과</DialogTitle>
              </DialogHeader>
              {previewResult && (
                // eslint-disable-next-line @next/next/no-img-element -- blob URL
                <img src={previewResult} alt="미리보기 결과" className="mt-4 rounded border" />
              )}
            </DialogContent>
          </Dialog>
        </Card>

        <Card className="p-6 space-y-4">
          <p className="text-lg font-bold">② 일괄 변환</p>
          <p className="text-sm text-muted-foreground">여러 이미지를 한번에 변환합니다</p>

          <div
            role="button"
            tabIndex={0}
            aria-label="이미지 여러 장 업로드 영역. 클릭하거나 파일을 드래그하세요"
            onDragOver={e => e.preventDefault()}
            onDragEnter={() => {
              batchDragCounter.current += 1;
              if (batchDragCounter.current === 1) {
                setBatchDragOver(true);
              }
            }}
            onDragLeave={() => {
              batchDragCounter.current -= 1;
              if (batchDragCounter.current === 0) {
                setBatchDragOver(false);
              }
            }}
            onDrop={handleBatchDrop}
            onClick={() => batchInputRef.current?.click()}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                batchInputRef.current?.click();
              }
            }}
            className={cn(
              'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors',
              'border-muted-foreground/25 hover:border-muted-foreground/50',
              batchFiles.length > 0 && 'border-primary/50',
              batchDragOver && 'border-primary bg-primary/5'
            )}
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">이미지를 드래그하거나 클릭하여 추가</p>
            <input
              ref={batchInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={handleBatchInput}
              className="hidden"
            />
          </div>

          {batchFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{batchFiles.length}개 파일</p>
                <Button variant="ghost" size="sm" onClick={clearBatch}>
                  전체 삭제
                </Button>
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {batchFiles.map((f, i) => (
                  <div
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between rounded px-3 py-1.5 text-sm bg-muted/50"
                  >
                    <span className="truncate">
                      {f.name}
                      <span className="text-xs text-muted-foreground ml-1.5">
                        {f.size < 1024 * 1024
                          ? `${(f.size / 1024).toFixed(0)}KB`
                          : `${(f.size / (1024 * 1024)).toFixed(1)}MB`}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeBatchFile(i)}
                      className="ml-2 flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleBatchSubmit} disabled={batchFiles.length === 0 || batchLoading} className="w-full">
            {batchLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                변환 중... ({batchProgress}/{batchFiles.length})
              </>
            ) : (
              '변환하기'
            )}
          </Button>

          {batchLoading && (
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(batchProgress / batchFiles.length) * 100}%` }}
              />
            </div>
          )}

          {batchError && <p className="text-sm text-destructive">{batchError}</p>}

          {batchResults.length > 0 && (
            <div className="flex items-center justify-between animate-fade-in">
              <p className="text-sm font-medium">{batchResults.length}개 변환 완료</p>
              <Button variant="outline" size="sm" onClick={downloadAll}>
                <Download className="mr-1.5 h-3.5 w-3.5" />
                다운로드
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
