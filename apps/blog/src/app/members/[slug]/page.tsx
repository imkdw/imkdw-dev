import { Layout, Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { MemberProfileCard } from '@/components/member/member-profile-card';
import { getCurrentMember, getMember, getMemberStats } from '@imkdw-dev/actions';
import { forbidden } from 'next/navigation';
import { formatDate } from '@imkdw-dev/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MemberDetail({ params }: Props) {
  const { slug } = await params;

  const member = await getMember(slug);

  const currentMember = await getCurrentMember();
  if (!currentMember || currentMember.id !== member.id) {
    forbidden();
  }

  const stats = await getMemberStats(member.id);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-6 md:py-8 lg:py-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">마이페이지</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <MemberProfileCard member={member} />

          <div className="space-y-6">
            <Card className="bg-card border-none">
              <CardHeader>
                <CardTitle>활동 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">작성한 댓글</span>
                  <span className="font-semibold">{stats.commentCount}개</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-none">
              <CardHeader>
                <CardTitle>계정 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-card border-none">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">가입일</span>
                  <span className="text-sm">{formatDate(member.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">계정 권한</span>
                  <span className="text-sm text-primary">{member.role}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
