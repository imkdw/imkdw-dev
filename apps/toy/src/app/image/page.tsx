import { Image, ImagePlus } from 'lucide-react';
import { CategoryHeader } from '@/components/category-header';
import { ToolCard } from '@/components/tool-card';

export default function ImagePage() {
  return (
    <div className="space-y-8">
      <CategoryHeader icon={Image} title="IMAGE" description="이미지 관련 유틸들" toolCount={1} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ToolCard icon={ImagePlus} title="배경 합성" description="누끼 이미지를 흰 배경에 합성합니다" status="준비 중" />
      </div>
    </div>
  );
}
