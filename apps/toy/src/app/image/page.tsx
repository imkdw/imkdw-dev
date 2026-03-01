import { Image, ImagePlus } from 'lucide-react';
import Link from 'next/link';
import { CategoryHeader } from '@/components/category-header';
import { ToolCard } from '@/components/tool-card';

export default function ImagePage() {
  return (
    <div className="space-y-8">
      <CategoryHeader icon={Image} title="IMAGE" description="이미지 관련 유틸들" toolCount={1} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <Link href="/image/compose">
          <ToolCard
            icon={ImagePlus}
            title="배경 합성"
            description="누끼 이미지를 흰 배경에 합성합니다"
          />
        </Link>
      </div>
    </div>
  );
}
