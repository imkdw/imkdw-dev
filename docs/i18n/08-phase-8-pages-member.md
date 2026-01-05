# Phase 8: 멤버 프로필

## 개요

멤버 프로필 페이지에 i18n 적용

- **예상 소요**: 0.5일
- **선행 조건**: Phase 2 완료
- **커밋 단위**: 2개

---

## Task 8.1: 메시지 파일에 멤버 번역 추가

### 작업 내용

- `messages/ko.json`에 member 네임스페이스 추가
- `messages/en.json`에 동일 구조 추가

### 파일 수정

#### `apps/blog/messages/ko.json` (추가)

```json
{
  "member": {
    "profile": {
      "title": "프로필",
      "description": "공개 프로필 정보를 수정할 수 있습니다",
      "editProfile": "프로필 수정",
      "commentsWritten": "작성한 댓글",
      "accountRole": "계정 권한",
      "memberSince": "가입일",
      "nickname": "닉네임",
      "email": "이메일",
      "profileImage": "프로필 이미지",
      "imageUploadHint": "이미지는 최대 2MB 까지 업로드 가능합니다"
    },
    "roles": {
      "admin": "관리자",
      "user": "일반 사용자"
    }
  }
}
```

#### `apps/blog/messages/en.json` (추가)

```json
{
  "member": {
    "profile": {
      "title": "Profile",
      "description": "Edit your public profile information",
      "editProfile": "Edit Profile",
      "commentsWritten": "Comments Written",
      "accountRole": "Account Role",
      "memberSince": "Member Since",
      "nickname": "Nickname",
      "email": "Email",
      "profileImage": "Profile Image",
      "imageUploadHint": "Maximum image size is 2MB"
    },
    "roles": {
      "admin": "Admin",
      "user": "User"
    }
  }
}
```

### 확인 사항

- [ ] `ko.json`에 member 네임스페이스 추가됨
- [ ] `en.json`에 동일 구조 추가됨
- [ ] JSON 문법 오류 없음

### 커밋

```
feat(blog): add member profile translations

- Add member namespace with profile fields and roles
```

---

## Task 8.2: 멤버 프로필 컴포넌트 i18n 적용

### 작업 내용

- `members/[slug]/page.tsx` i18n 적용
- `member-profile-card.tsx` i18n 적용

### 파일 수정

#### `apps/blog/src/app/[locale]/members/[slug]/page.tsx`

```tsx
import { Layout } from '@/components/layout';
import { MemberProfileCard } from '@/components/member/member-profile-card';
import { getMember } from '@imkdw-dev/api-client';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const member = await getMember(slug);
  const t = await getTranslations('member.profile');

  return {
    title: `${member.nickname} - ${t('title')}`,
  };
}

export default async function MemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getMember(slug);

  const t = await getTranslations('member');

  const translations = {
    profile: {
      title: t('profile.title'),
      description: t('profile.description'),
      editProfile: t('profile.editProfile'),
      commentsWritten: t('profile.commentsWritten'),
      accountRole: t('profile.accountRole'),
      memberSince: t('profile.memberSince'),
      nickname: t('profile.nickname'),
      email: t('profile.email'),
      profileImage: t('profile.profileImage'),
      imageUploadHint: t('profile.imageUploadHint'),
    },
    roles: {
      admin: t('roles.admin'),
      user: t('roles.user'),
    },
  };

  return (
    <Layout>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <MemberProfileCard member={member} translations={translations} />
      </div>
    </Layout>
  );
}
```

#### `apps/blog/src/components/member/member-profile-card.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Edit, MessageCircle, Shield, Calendar } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Input,
  Label,
} from '@imkdw-dev/ui';
import { useAuth } from '@imkdw-dev/auth';
import { IMemberDto } from '@imkdw-dev/types';
import { MEMBER_ROLE } from '@imkdw-dev/consts';

interface Props {
  member: IMemberDto;
  translations: {
    profile: {
      title: string;
      description: string;
      editProfile: string;
      commentsWritten: string;
      accountRole: string;
      memberSince: string;
      nickname: string;
      email: string;
      profileImage: string;
      imageUploadHint: string;
    };
    roles: {
      admin: string;
      user: string;
    };
  };
}

export function MemberProfileCard({ member, translations }: Props) {
  const { member: currentMember } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const isOwnProfile = currentMember?.id === member.id;
  const roleLabel = member.role === MEMBER_ROLE.ADMIN ? translations.roles.admin : translations.roles.user;

  const stats = [
    {
      icon: MessageCircle,
      label: translations.profile.commentsWritten,
      value: member.commentCount ?? 0,
    },
    {
      icon: Shield,
      label: translations.profile.accountRole,
      value: roleLabel,
    },
    {
      icon: Calendar,
      label: translations.profile.memberSince,
      value: new Date(member.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={member.profileImage} alt={member.nickname} />
            <AvatarFallback className="text-2xl">{member.nickname.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">{member.nickname}</CardTitle>
        <CardDescription>{translations.profile.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(stat => (
            <div key={stat.label} className="text-center p-4 bg-muted/30 rounded-lg">
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {isOwnProfile && !isEditing && (
          <Button onClick={() => setIsEditing(true)} className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            {translations.profile.editProfile}
          </Button>
        )}

        {isEditing && (
          <div className="space-y-4 border-t pt-4">
            <div>
              <Label htmlFor="nickname">{translations.profile.nickname}</Label>
              <Input id="nickname" defaultValue={member.nickname} />
            </div>
            <div>
              <Label htmlFor="email">{translations.profile.email}</Label>
              <Input id="email" defaultValue={member.email} disabled />
            </div>
            <p className="text-xs text-muted-foreground">{translations.profile.imageUploadHint}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### 확인 사항

- [ ] members/[slug]/page.tsx에 getTranslations 적용됨
- [ ] MemberProfileCard에 translations props 추가됨
- [ ] 하드코딩된 텍스트 제거됨
- [ ] `/ko/members/[id]`, `/en/members/[id]` 에서 올바른 언어로 표시됨

### 커밋

```
feat(blog): apply i18n to member profile page

- Update members/[slug]/page.tsx with translations
- Update MemberProfileCard with translations prop
```

---

## Phase 8 완료 체크리스트

- [ ] Task 8.1 완료 및 커밋
- [ ] Task 8.2 완료 및 커밋
- [ ] `/ko/members/[id]` 한국어 표시 확인
- [ ] `/en/members/[id]` 영어 표시 확인
- [ ] 프로필 통계 번역 확인
- [ ] 역할(Admin/User) 번역 확인
- [ ] 전체 빌드 테스트 (`pnpm build`)

## 다음 Phase

Phase 8 완료 후 [Phase 9: 마무리](./09-phase-9-finishing.md)로 진행
