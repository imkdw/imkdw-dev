import { Injectable } from '@nestjs/common';
import { MemberValidator } from '@/shared/validator/member.validator';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { UpdateMemberDto } from '@/features/member/dto/update-member.dto';
import { Member } from '@/shared/domain/member/member';
import { CopyImageService } from '@/shared/services/image/copy-image.service';

@Injectable()
export class UpdateMemberUseCase {
  constructor(
    private readonly memberValidator: MemberValidator,
    private readonly memberRepository: MemberRepository,
    private readonly copyImageService: CopyImageService
  ) {}

  async execute(memberId: string, dto: UpdateMemberDto): Promise<void> {
    const existingMember = await this.memberValidator.checkExist(memberId);
    await this.memberValidator.checkExistNickname(dto.nickname, memberId);

    const profileImageUrl = await this.copyImageService.copySingle(dto.profileImage, `members/${memberId}`);

    const updatedMember = Member.create({
      id: existingMember.id,
      email: existingMember.email,
      nickname: dto.nickname,
      profileImage: profileImageUrl,
      providerId: existingMember.providerId,
      provider: existingMember.provider,
      role: existingMember.role,
      createdAt: existingMember.createdAt,
    });

    await this.memberRepository.save(updatedMember);
  }
}
