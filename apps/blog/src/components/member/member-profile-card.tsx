'use client';

import { useRef, ChangeEvent } from 'react';
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
  Separator,
} from '@imkdw-dev/ui';
import { Camera } from 'lucide-react';
import { IMemberDto } from '@imkdw-dev/types';
import { useMemberProfile } from '@imkdw-dev/hooks';

interface Props {
  member: IMemberDto;
}

export function MemberProfileCard({ member }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { formData, isEditing, setIsEditing, handlers } = useMemberProfile(member);

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    await handlers.handleImageUpload(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="bg-card border-none">
      <CardHeader>
        <CardTitle>프로필 정보</CardTitle>
        <CardDescription>공개 프로필 정보를 수정할 수 있습니다</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 프로필 이미지 */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24">
            <AvatarImage src={formData.profileImage} alt={member.nickname} />
            <AvatarFallback className="bg-primary text-primary-foreground text-base sm:text-lg md:text-xl">
              {member.nickname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <Button onClick={handleAvatarChange} variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              이미지 변경
            </Button>
            <p className="text-sm text-muted-foreground">이미지는 최대 2MB 까지 업로드 가능합니다</p>
          </div>
        </div>

        <Separator />

        {/* 기본 정보 */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" value={member.email} disabled className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">소셜로그인 공급자</Label>
            <Input id="provider" value={member.provider} disabled className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">닉네임</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => handlers.setNickname(e.target.value)}
              disabled={!isEditing}
              placeholder="닉네임을 입력하세요"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handlers.handleCancel} className="w-full sm:w-auto">
                취소
              </Button>
              <Button onClick={handlers.handleSave} className="w-full sm:w-auto">
                저장
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
              프로필 수정
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
