import { Inject, Injectable } from '@nestjs/common';
import { MemberValidator } from '@/shared/validator/member.validator';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { STORAGE_SERVICE, StorageService } from '@/infra/storage/storage.service';
import { UpdateMemberDto } from '@/features/member/dto/update-member.dto';
import { Member } from '@/shared/domain/member/member';

@Injectable()
export class UpdateMemberUseCase {
  constructor(
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageService,
    private readonly memberValidator: MemberValidator,
    private readonly memberRepository: MemberRepository
  ) {}

  async execute(memberId: string, dto: UpdateMemberDto): Promise<void> {
    const existingMember = await this.memberValidator.checkExist(memberId);
    await this.memberValidator.checkExistNickname(dto.nickname, memberId);

    const profileImageUrl = await this.getProfileImageUrl(memberId, dto.profileImage);

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

  private getProfileImageUrl(memberId: string, profileImage: string) {
    if (profileImage.startsWith('https://')) {
      return profileImage;
    }

    const destinationPath = `members/${memberId}/${profileImage}`;
    return this.storageService.copyTempFile(profileImage, destinationPath);
  }
}
