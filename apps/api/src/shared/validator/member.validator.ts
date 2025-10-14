import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';
import { ExistMemberNicknameException } from '@/features/member/exception/exist-member-nickname.exception';
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

  async checkExistNickname(nickname: string, excludeId: string) {
    const member = await this.memberRepository.findByNickname(nickname);

    if (member && member.id !== excludeId) {
      throw new ExistMemberNicknameException(`이미 사용 중인 닉네임입니다`);
    }
  }
}
