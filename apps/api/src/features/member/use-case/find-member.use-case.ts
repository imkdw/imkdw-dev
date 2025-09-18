import { Injectable } from '@nestjs/common';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { Member } from '@/shared/domain/member/member';
import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';

@Injectable()
export class FindMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute(memberId: string): Promise<Member> {
    const member = await this.memberRepository.findById(memberId);

    if (!member) {
      throw new MemberNotFoundException('사용자를 찾을 수 없습니다.');
    }

    return member;
  }
}
