'use client';

import { useState } from 'react';
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
import { Camera, Save, User } from 'lucide-react';
import { IMemberDto } from '@imkdw-dev/types';

interface EditableProfileProps {
  member: IMemberDto;
}

export function EditableProfile({ member }: EditableProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: member.nickname,
    bio: '안녕하세요!' // TODO: 실제 bio 필드가 추가되면 member.bio로 변경
  });

  const handleSave = () => {
    // TODO: 실제 수정 API 호출 구현 예정
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ name: member.nickname, bio: '안녕하세요!' });
    setIsEditing(false);
  };

  const handleAvatarChange = () => {
    // TODO: 이미지 변경 로직 구현 예정
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>프로필 정보</CardTitle>
        <CardDescription>공개 프로필 정보를 수정할 수 있습니다</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 프로필 이미지 */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={member.profileImage} alt={member.nickname} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {member.nickname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button onClick={handleAvatarChange} variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              이미지 변경
            </Button>
            <p className="text-sm text-muted-foreground">JPG, PNG 파일만 업로드 가능합니다 (최대 2MB)</p>
          </div>
        </div>

        <Separator />

        {/* 기본 정보 */}
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input id="email" value={member.email} disabled className="bg-muted" />
            <p className="text-sm text-muted-foreground">이메일은 변경할 수 없습니다</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">닉네임</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              placeholder="닉네임을 입력하세요"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">소개</Label>
            <Input
              id="bio"
              value={formData.bio}
              onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              placeholder="간단한 자기소개를 입력하세요"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                취소
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                저장
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <User className="mr-2 h-4 w-4" />
              프로필 수정
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}