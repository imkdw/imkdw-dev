import { Card } from '@imkdw-dev/ui';

export function ArticleWritingTips() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">💡 작성 팁</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>• 주요 키워드가 포함된 설명적인 제목 사용</p>
        <p>• 가독성을 위해 긴 문단을 나누어 작성</p>
        <p>• 기술적 개념 설명 시 코드 예제 포함</p>
        <p>• 다른 사람이 찾을 수 있도록 관련 태그 추가</p>
      </div>
    </Card>
  );
}
