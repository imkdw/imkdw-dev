import { Card, CardHeader, CardTitle, CardContent } from '@imkdw-dev/ui';
import { Layout } from '@/components/layout';
import { MemberProfileCard } from '@/components/member/member-profile-card';
import { getCurrentMember, getMember, getMemberStats } from '@imkdw-dev/api-client';
import { forbidden } from 'next/navigation';
import { formatDate } from '@imkdw-dev/utils';
import { getTranslations } from 'next-intl/server';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations('member.page');
  return {
    title: t('title'),
  };
}

export default async function MemberDetail({ params }: Props) {
  const { slug } = await params;

  const member = await getMember(slug);

  const currentMember = await getCurrentMember();
  if (!currentMember || currentMember.id !== member.id) {
    forbidden();
  }

  const stats = await getMemberStats(member.id);
  const t = await getTranslations('member');
  const tCommon = await getTranslations('common.buttons');

  const profileCardTranslations = {
    profile: {
      title: t('profile.title'),
      description: t('profile.description'),
      editProfile: t('profile.editProfile'),
      changeImage: t('profile.changeImage'),
      imageUploadHint: t('profile.imageUploadHint'),
      email: t('profile.email'),
      provider: t('profile.provider'),
      nickname: t('profile.nickname'),
      nicknamePlaceholder: t('profile.nicknamePlaceholder'),
    },
    buttons: {
      cancel: tCommon('cancel'),
      save: tCommon('save'),
    },
  };

  const roleLabel = member.role === MEMBER_ROLE.ADMIN ? t('roles.ADMIN') : t('roles.USER');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t('page.title')}</h1>
        </div>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <div className="md:col-span-1 lg:col-span-2">
            <MemberProfileCard member={member} translations={profileCardTranslations} />
          </div>
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <Card className="bg-card border-none">
              <CardHeader>
                <CardTitle>{t('stats.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('stats.commentsWritten')}</span>
                  <span className="font-semibold">{stats.commentCount}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-none">
              <CardHeader>
                <CardTitle>{t('account.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 bg-card border-none">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('account.memberSince')}</span>
                  <span className="text-sm">{formatDate(member.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('account.role')}</span>
                  <span className="text-sm text-primary">{roleLabel}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
