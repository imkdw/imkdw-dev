'use client';

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { Button, Card, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label, cn } from '@imkdw-dev/ui';
import { Download, Loader2, Upload, X } from 'lucide-react';
import { zipSync } from 'fflate';
import { convertToWebp } from '../_lib/convert-to-webp';

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const MAX_BATCH_FILES = 100;
const DEFAULT_QUALITY = 80;
const MIN_QUALITY = 0;
const MAX_QUALITY = 100;

interface BatchResult {
  name: string;
  size: number;
  url: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)}KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function normalizeQuality(value: string): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    return DEFAULT_QUALITY;
  }

  return Math.min(MAX_QUALITY, Math.max(MIN_QUALITY, parsed));
}

export function OptimizeForm() {
  const [qualityText, setQualityText] = useState(String(DEFAULT_QUALITY));

  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewResultSrc, setPreviewResultSrc] = useState<string | null>(null);
  const [previewResultSize, setPreviewResultSize] = useState<number | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDragOver, setPreviewDragOver] = useState(false);
  const previewInputRef = useRef<HTMLInputElement>(null);
  const previewDragCounter = useRef(0);

  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [batchDragOver, setBatchDragOver] = useState(false);
  const batchInputRef = useRef<HTMLInputElement>(null);
  const batchDragCounter = useRef(0);

  const previewSrcRef = useRef<string | null>(null);
  const previewResultSrcRef = useRef<string | null>(null);
  const batchResultUrlsRef = useRef<string[]>([]);

  const quality = normalizeQuality(qualityText);

  useEffect(() => {
    previewSrcRef.current = previewSrc;
  }, [previewSrc]);

  useEffect(() => {
    previewResultSrcRef.current = previewResultSrc;
  }, [previewResultSrc]);

  useEffect(() => {
    batchResultUrlsRef.current = batchResults.map(result => result.url);
  }, [batchResults]);

  useEffect(() => {
    return () => {
      if (previewSrcRef.current) {
        URL.revokeObjectURL(previewSrcRef.current);
      }
      if (previewResultSrcRef.current) {
        URL.revokeObjectURL(previewResultSrcRef.current);
      }
      batchResultUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  function clearPreview() {
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }
    if (previewResultSrc) {
      URL.revokeObjectURL(previewResultSrc);
    }
    setPreviewFile(null);
    setPreviewSrc(null);
    setPreviewResultSrc(null);
    setPreviewResultSize(null);
    setPreviewError(null);
    setPreviewOpen(false);
  }

  function handlePreviewFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setPreviewError('이미지 파일만 업로드할 수 있습니다');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setPreviewError('파일 크기가 25MB를 초과합니다');
      return;
    }

    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }
    if (previewResultSrc) {
      URL.revokeObjectURL(previewResultSrc);
    }

    setPreviewFile(file);
    setPreviewSrc(URL.createObjectURL(file));
    setPreviewResultSrc(null);
    setPreviewResultSize(null);
    setPreviewError(null);
  }

  function handlePreviewDrop(event: DragEvent) {
    event.preventDefault();
    previewDragCounter.current = 0;
    setPreviewDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handlePreviewFile(file);
    }
  }

  function handlePreviewInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      handlePreviewFile(file);
    }
  }

  async function handlePreviewConvert() {
    if (!previewFile) {
      return;
    }

    setPreviewLoading(true);
    setPreviewError(null);

    if (previewResultSrc) {
      URL.revokeObjectURL(previewResultSrc);
      setPreviewResultSrc(null);
      setPreviewResultSize(null);
    }

    try {
      const converted = await convertToWebp(previewFile, { quality });
      setPreviewResultSrc(URL.createObjectURL(converted));
      setPreviewResultSize(converted.size);
      setPreviewOpen(true);
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : '변환 중 오류가 발생했습니다');
    } finally {
      setPreviewLoading(false);
    }
  }

  function clearBatch() {
    batchResults.forEach(result => URL.revokeObjectURL(result.url));
    setBatchFiles([]);
    setBatchResults([]);
    setBatchError(null);
    setBatchProgress(0);
  }

  function removeBatchFile(index: number) {
    setBatchFiles(current => current.filter((_, fileIndex) => fileIndex !== index));
  }

  function addBatchFiles(files: File[]) {
    const existing = new Set(batchFiles.map(file => `${file.name}-${file.size}-${file.lastModified}`));
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const uniqueFiles = imageFiles.filter(file => !existing.has(`${file.name}-${file.size}-${file.lastModified}`));
    const oversizedCount = uniqueFiles.filter(file => file.size > MAX_FILE_SIZE).length;
    const validFiles = uniqueFiles.filter(file => file.size <= MAX_FILE_SIZE);

    const remainingSlots = Math.max(MAX_BATCH_FILES - batchFiles.length, 0);
    const acceptedFiles = validFiles.slice(0, remainingSlots);
    const cappedOutCount = Math.max(validFiles.length - acceptedFiles.length, 0);

    if (acceptedFiles.length > 0) {
      batchResults.forEach(result => URL.revokeObjectURL(result.url));
      setBatchResults([]);
      setBatchFiles(current => [...current, ...acceptedFiles]);
    }

    const messages: string[] = [];
    if (oversizedCount > 0) {
      messages.push(`25MB 초과 파일 ${oversizedCount}개 제외`);
    }
    if (cappedOutCount > 0) {
      messages.push(`최대 ${MAX_BATCH_FILES}개 제한으로 ${cappedOutCount}개 제외`);
    }

    setBatchError(messages.length > 0 ? messages.join(' · ') : null);
  }

  function handleBatchDrop(event: DragEvent) {
    event.preventDefault();
    batchDragCounter.current = 0;
    setBatchDragOver(false);
    addBatchFiles(Array.from(event.dataTransfer.files));
  }

  function handleBatchInput(event: ChangeEvent<HTMLInputElement>) {
    addBatchFiles(Array.from(event.target.files ?? []));
    event.target.value = '';
  }

  async function handleBatchConvert() {
    if (batchFiles.length === 0) {
      return;
    }

    setBatchLoading(true);
    setBatchError(null);
    setBatchProgress(0);
    batchResults.forEach(result => URL.revokeObjectURL(result.url));
    setBatchResults([]);

    try {
      const convertedResults: BatchResult[] = [];

      for (let index = 0; index < batchFiles.length; index++) {
        const file = batchFiles[index];
        if (!file) {
          continue;
        }

        const converted = await convertToWebp(file, { quality });
        const baseName = file.name.replace(/\.[^.]+$/, '');

        convertedResults.push({
          name: `${baseName}.webp`,
          size: converted.size,
          url: URL.createObjectURL(converted),
        });

        setBatchProgress(index + 1);
      }

      setBatchResults(convertedResults);
    } catch (error) {
      setBatchError(error instanceof Error ? error.message : '일괄 변환 중 오류가 발생했습니다');
    } finally {
      setBatchLoading(false);
    }
  }

  async function downloadBatchZip() {
    if (batchResults.length === 0) {
      return;
    }

    const files: Record<string, Uint8Array> = {};

    await Promise.all(
      batchResults.map(async result => {
        const response = await fetch(result.url);
        const buffer = await response.arrayBuffer();
        files[result.name] = new Uint8Array(buffer);
      })
    );

    const zipped = zipSync(files);
    const zipBlob = new Blob([new Uint8Array(zipped)], { type: 'application/zip' });
    const zipUrl = URL.createObjectURL(zipBlob);

    const anchor = document.createElement('a');
    anchor.href = zipUrl;
    anchor.download = `webp_optimized_q${Math.round(quality)}.zip`;
    anchor.click();

    setTimeout(() => URL.revokeObjectURL(zipUrl), 1000);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="space-y-4 p-6">
        <p className="text-lg font-bold">① 미리보기</p>
        <p className="text-sm text-muted-foreground">이미지 1장을 변환해 품질을 먼저 확인합니다</p>

        <div className="space-y-2">
          <Label htmlFor="webpQuality" className="text-base font-bold">
            WebP 품질 (0-100)
          </Label>
          <Input
            id="webpQuality"
            type="number"
            min={MIN_QUALITY}
            max={MAX_QUALITY}
            value={qualityText}
            onChange={event => setQualityText(event.target.value)}
            onBlur={() => setQualityText(String(Math.round(normalizeQuality(qualityText))))}
            className="w-32 ring-1 ring-input"
          />
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="미리보기 이미지 업로드 영역. 클릭하거나 파일을 드래그하세요"
          onDragOver={event => event.preventDefault()}
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
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              previewInputRef.current?.click();
            }
          }}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 transition-colors',
            'border-muted-foreground/25 hover:border-muted-foreground/50',
            previewSrc && 'border-primary/50',
            previewDragOver && 'border-primary bg-primary/5'
          )}
        >
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob URL preview
            <img src={previewSrc} alt="원본 이미지" className="max-h-40 rounded object-contain" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">이미지 1장을 드래그하거나 클릭해 업로드</p>
            </>
          )}

          <input ref={previewInputRef} type="file" accept="image/*" onChange={handlePreviewInput} className="hidden" />
        </div>

        <div className="flex gap-2">
          <Button onClick={handlePreviewConvert} disabled={!previewFile || previewLoading} className="flex-1">
            {previewLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                변환 중...
              </>
            ) : (
              '미리보기 변환'
            )}
          </Button>
          <Button variant="outline" onClick={clearPreview} disabled={!previewFile && !previewResultSrc}>
            초기화
          </Button>
        </div>

        {previewError && <p className="text-sm text-destructive">{previewError}</p>}

        {previewResultSrc && (
          <Button variant="outline" onClick={() => setPreviewOpen(true)} className="w-full">
            결과 다시 보기
          </Button>
        )}

        <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)}>
          <DialogContent onClose={() => setPreviewOpen(false)} className="w-[min(96vw,1400px)] max-w-[1400px]">
            <DialogHeader>
              <DialogTitle>품질 미리보기</DialogTitle>
            </DialogHeader>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-base font-semibold">원본</p>
                {previewSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- blob URL preview
                  <img src={previewSrc} alt="원본" className="max-h-[70vh] w-full rounded border object-contain" />
                ) : null}
                {previewFile ? (
                  <p className="text-xs text-muted-foreground">{formatFileSize(previewFile.size)}</p>
                ) : null}
              </div>

              <div className="space-y-3">
                <p className="text-base font-semibold">WebP (품질 {Math.round(quality)})</p>
                {previewResultSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- blob URL preview
                  <img
                    src={previewResultSrc}
                    alt="WebP 결과"
                    className="max-h-[70vh] w-full rounded border object-contain"
                  />
                ) : null}
                {previewResultSize !== null ? (
                  <p className="text-xs text-muted-foreground">{formatFileSize(previewResultSize)}</p>
                ) : null}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>

      <Card className="space-y-4 p-6">
        <p className="text-lg font-bold">② 일괄 변환</p>
        <p className="text-sm text-muted-foreground">여러 이미지를 한 번에 WebP로 변환하고 ZIP으로 받습니다</p>

        <div className="space-y-2">
          <Label htmlFor="webpQualityBatch" className="text-base font-bold">
            WebP 품질 (0-100)
          </Label>
          <Input
            id="webpQualityBatch"
            type="number"
            min={MIN_QUALITY}
            max={MAX_QUALITY}
            value={qualityText}
            onChange={event => setQualityText(event.target.value)}
            onBlur={() => setQualityText(String(Math.round(normalizeQuality(qualityText))))}
            className="w-32 ring-1 ring-input"
          />
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-label="일괄 변환 이미지 업로드 영역. 클릭하거나 파일을 드래그하세요"
          onDragOver={event => event.preventDefault()}
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
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              batchInputRef.current?.click();
            }
          }}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 transition-colors',
            'border-muted-foreground/25 hover:border-muted-foreground/50',
            batchFiles.length > 0 && 'border-primary/50',
            batchDragOver && 'border-primary bg-primary/5'
          )}
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">이미지를 드래그하거나 클릭하여 추가</p>
          <p className="text-xs text-muted-foreground">최대 100장, 각 파일 최대 25MB</p>

          <input
            ref={batchInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleBatchInput}
            className="hidden"
          />
        </div>

        {batchFiles.length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{batchFiles.length}개 파일 선택됨</p>
              <Button variant="ghost" size="sm" onClick={clearBatch}>
                전체 삭제
              </Button>
            </div>

            <div className="max-h-44 space-y-1 overflow-y-auto">
              {batchFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="flex items-center justify-between rounded bg-muted/50 px-3 py-1.5 text-sm"
                >
                  <span className="truncate">
                    {file.name}
                    <span className="ml-1.5 text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeBatchFile(index)}
                    className="ml-2 flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <Button onClick={handleBatchConvert} disabled={batchFiles.length === 0 || batchLoading} className="w-full">
          {batchLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              변환 중... ({batchProgress}/{batchFiles.length})
            </>
          ) : (
            '일괄 변환'
          )}
        </Button>

        {batchLoading ? (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(batchProgress / batchFiles.length) * 100}%` }}
            />
          </div>
        ) : null}

        {batchError ? <p className="text-sm text-destructive">{batchError}</p> : null}

        {batchResults.length > 0 ? (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{batchResults.length}개 변환 완료</p>
            <Button variant="outline" size="sm" onClick={downloadBatchZip}>
              <Download className="mr-1.5 h-3.5 w-3.5" />
              ZIP 다운로드
            </Button>
          </div>
        ) : null}

        {batchResults.length > 0 ? (
          <div className="max-h-44 space-y-1 overflow-y-auto rounded border p-2">
            {batchResults.map(result => (
              <div
                key={result.url}
                className="flex items-center justify-between rounded px-2 py-1 text-xs text-muted-foreground"
              >
                <span className="truncate">{result.name}</span>
                <span>{formatFileSize(result.size)}</span>
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </div>
  );
}
