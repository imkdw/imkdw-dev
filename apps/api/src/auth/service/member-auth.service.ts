import { MemberRepository } from '@/shared/repository/member/member.repository';
import { Injectable } from '@nestjs/common';
import { Member } from '@/shared/domain/member/member';
import { MemberFactory } from '@/shared/factory/member.factory';
import { OAuthProvider } from '@imkdw-dev/consts';

@Injectable()
export class MemberAuthService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async findOrCreateMember(provider: OAuthProvider, providerId: string, email: string): Promise<Member> {
    const existingMember = await this.memberRepository.findByOAuth(provider, providerId);

    if (existingMember) {
      return existingMember;
    }

    const newMember = MemberFactory.createNew(provider, providerId, email);

    return this.memberRepository.create(newMember);
  }
}
