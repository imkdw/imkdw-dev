import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';
import { MemberValidator } from '@/shared/validator/member.validator';
import { ResponseGetMemberStatsDto } from '@/features/member/dto/member-stats.dto';

@Injectable()
export class GetMemberStatsQuery {
  constructor(
    private readonly prisma: PrismaService,
    private readonly memberValidator: MemberValidator
  ) {}

  async execute(memberId: string): Promise<ResponseGetMemberStatsDto> {
    await this.memberValidator.checkExist(memberId);

    const commentCount = await this.prisma.articleComment.count({
      where: {
        authorId: memberId,
        deletedAt: null,
      },
    });

    return { commentCount };
  }
}
