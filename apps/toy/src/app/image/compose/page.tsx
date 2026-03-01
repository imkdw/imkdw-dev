import { ComposeForm } from './compose-form';

export default function ComposePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">배경 합성</h1>
        <p className="mt-1 text-muted-foreground">누끼 이미지를 선택한 크기의 흰 배경에 합성합니다</p>
      </div>
      <ComposeForm />
    </div>
  );
}
