import { redirect } from 'next/navigation';
import {
  Layout,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@imkdw-dev/ui';
import { getCurrentMember } from '@/actions/member.action';
import { EditableProfile } from '@/components/member/editable-profile';

export default async function MemberDetail() {
  const member = await getCurrentMember();

  if (!member) {
    redirect('/login');
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">마이페이지</h1>
            <p className="text-muted-foreground">프로필과 설정을 관리하세요</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* 프로필 정보 - 클라이언트 컴포넌트로 분리 */}
          <EditableProfile member={member} />

          {/* 계정 통계 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>활동 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">작성한 글</span>
                  <span className="font-semibold">12개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">받은 좋아요</span>
                  <span className="font-semibold">48개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">작성한 댓글</span>
                  <span className="font-semibold">156개</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>계정 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">가입일</span>
                  <span className="text-sm">2024.01.01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">계정 상태</span>
                  <span className="text-sm text-primary">활성</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
