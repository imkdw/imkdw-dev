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
  translations: {
    profile: {
      title: string;
      description: string;
      editProfile: string;
      changeImage: string;
      imageUploadHint: string;
      email: string;
      provider: string;
      nickname: string;
      nicknamePlaceholder: string;
    };
    buttons: {
      cancel: string;
      save: string;
    };
  };
}

export function MemberProfileCard({ member, translations }: Props) {
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
        <CardTitle>{translations.profile.title}</CardTitle>
        <CardDescription>{translations.profile.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
              {translations.profile.changeImage}
            </Button>
            <p className="text-sm text-muted-foreground">{translations.profile.imageUploadHint}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{translations.profile.email}</Label>
            <Input id="email" value={member.email} disabled className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{translations.profile.provider}</Label>
            <Input id="provider" value={member.provider} disabled className="bg-muted" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">{translations.profile.nickname}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => handlers.setNickname(e.target.value)}
              disabled={!isEditing}
              placeholder={translations.profile.nicknamePlaceholder}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handlers.handleCancel} className="w-full sm:w-auto">
                {translations.buttons.cancel}
              </Button>
              <Button onClick={handlers.handleSave} className="w-full sm:w-auto">
                {translations.buttons.save}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto">
              {translations.profile.editProfile}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
