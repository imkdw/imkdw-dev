import { Metadata } from 'next';
import { createMetadata } from '@/utils/metadata-creator';
import { OptimizeForm } from './optimize-form';

export const metadata: Metadata = createMetadata({
  title: 'WebP 최적화',
  description: '이미지를 WebP로 최적화하고 품질을 확인한 뒤 일괄 다운로드합니다',
});

export default function OptimizePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">WebP 최적화</h1>
        <p className="mt-1 text-muted-foreground">
          품질을 설정해 이미지를 WebP로 변환합니다
          <span className="ml-1.5 text-sm text-muted-foreground/60">· 이미지 1장당 최대 25MB · 일괄 최대 100장</span>
        </p>
      </div>

      <OptimizeForm />
    </div>
  );
}
