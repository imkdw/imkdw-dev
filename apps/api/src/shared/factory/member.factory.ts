import { generateUUID } from '@/common/utils/string.util';
import { Member } from '@/shared/domain/member/member';
import { MEMBER_ROLE, OAuthProvider } from '@imkdw-dev/consts';

export class MemberFactory {
  static createNew(provider: OAuthProvider, providerId: string, email: string): Member {
    // TODO: 랜덤 닉네임 생성방식 변경
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    return Member.create({
      id: generateUUID(),
      email,
      nickname: `user_${timestamp}_${randomSuffix}`,
      profileImage: '',
      providerId,
      provider,
      role: MEMBER_ROLE.USER,
    });
  }
}
