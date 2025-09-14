import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberValidator {
  constructor(private readonly memberRepository: MemberRepository) {}

  async checkExist(id: string) {
    const member = await this.memberRepository.findById(id);

    if (!member) {
      throw new MemberNotFoundException(`멤버를 찾을 수 없습니다`);
    }

    return member;
  }
}
