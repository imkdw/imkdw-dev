import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IMemberDto } from '@imkdw-dev/types';
import { updateMember, getUploadUrl } from '@imkdw-dev/api-client';
import { MAX_IMAGE_SIZE } from '@imkdw-dev/consts';
import { generateUUID } from '@imkdw-dev/utils';
import { useAuth } from '@imkdw-dev/auth';

interface FormData {
  name: string;
  profileImage: string;
}

interface Result {
  formData: FormData;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handlers: {
    handleSave: () => Promise<void>;
    handleCancel: () => void;
    handleImageUpload: (file: File) => Promise<void>;
    setNickname: (nickname: string) => void;
  };
}

export const useMemberProfile = (member: IMemberDto): Result => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: member.nickname,
    profileImage: member.profileImage,
  });
  const { setMember } = useAuth();

  const handleSave = async () => {
    await updateMember(member.id, {
      nickname: formData.name,
      profileImage: formData.profileImage,
    });
    setIsEditing(false);
    router.refresh();
  };

  const handleCancel = () => {
    setFormData({ name: member.nickname, profileImage: member.profileImage });
    setIsEditing(false);
  };

  const handleImageUpload = async (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      return;
    }

    const extension = file.name.split('.').pop() ?? '';

    const fileName = generateUUID();
    const { url, pathPrefix } = await getUploadUrl(fileName, extension);

    const uploadResponse = await fetch(url, { method: 'PUT', body: file });

    if (!uploadResponse.ok) {
      return;
    }

    const fileUrl = `${pathPrefix}/${fileName}.${extension}`;

    await updateMember(member.id, { nickname: formData.name, profileImage: fileUrl });
    setMember({ ...member, profileImage: fileUrl });
    setFormData(prev => ({ ...prev, profileImage: fileUrl }));
  };

  const setNickname = (nickname: string) => {
    setFormData(prev => ({ ...prev, name: nickname }));
  };

  return {
    formData,
    isEditing,
    setIsEditing,
    handlers: {
      handleSave,
      handleCancel,
      handleImageUpload,
      setNickname,
    },
  };
};
