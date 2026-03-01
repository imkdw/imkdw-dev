import { ComposeForm } from './compose-form';
import { ManualImage } from './manual-image';

export default function ComposePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">배경 합성</h1>
        <p className="mt-1 text-muted-foreground">
          누끼 이미지를 선택한 크기의 흰 배경에 합성합니다
          <span className="ml-1.5 text-sm text-muted-foreground/60">· 이미지 1장당 최대 25MB</span>
        </p>
      </div>

      <details className="group rounded-lg border bg-card p-4">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium select-none list-none [&::-webkit-details-marker]:hidden">
          <span className="transition-transform group-open:rotate-90">▶</span>
          사용 가이드
        </summary>
        <div className="mt-4 flex justify-center">
          <ManualImage />
        </div>
      </details>

      <ComposeForm />
    </div>
  );
}
