import { Member } from '@/shared/domain/member/member';
import { MemberEntity } from '@/shared/entity/member/member.entity';

export class MemberMapper {
  static toDomain(entity: MemberEntity): Member {
    return Member.create({
      id: entity.id,
      email: entity.email,
      nickname: entity.nickname,
      profileImage: entity.profileImage,
      providerId: entity.providerId,
      provider: entity.provider,
      role: entity.role,
      deletedAt: entity.deletedAt,
    });
  }
}
