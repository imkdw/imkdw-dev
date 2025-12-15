'use client';

import { Card, RadioGroup, RadioGroupItem } from '@imkdw-dev/ui';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
}

export function ArticleVisibilitySelector({ value, onValueChange }: Props) {
  return (
    <Card className="p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <label className="text-sm font-medium mb-3">공개 설정</label>
        <RadioGroup value={value} onValueChange={onValueChange}>
          <RadioGroupItem value={ARTICLE_STATE.NORMAL}>
            <div>
              <div className="text-sm font-medium">공개</div>
              <div className="text-xs text-muted-foreground/70">모든 사용자가 볼 수 있습니다</div>
            </div>
          </RadioGroupItem>
          <RadioGroupItem value={ARTICLE_STATE.HIDDEN}>
            <div>
              <div className="text-sm font-medium">비공개</div>
              <div className="text-xs text-muted-foreground/70">관리자만 볼 수 있습니다</div>
            </div>
          </RadioGroupItem>
        </RadioGroup>
        <p className="text-xs text-muted-foreground/70 mt-2">게시글의 공개 상태를 설정하세요</p>
      </div>
    </Card>
  );
}
