import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentMemberUseCase } from '@/features/member/use-case/get-current-member.use-case';
import { FindMemberUseCase } from '@/features/member/use-case/find-member.use-case';
import { MemberDto } from '@/features/member/dto/member.dto';
import { CurrentRequester } from '@/common/decorator/current-requester.decorator';
import { Requester } from '@/common/types/requester.type';
import { MemberAccessGuard } from '@/common/guards/member-access.guard';
import * as Swagger from '@/features/member/swagger/member.swagger';
import { API_ENDPOINTS } from '@imkdw-dev/consts';

@ApiTags('사용자')
@Controller()
export class MemberController {
  constructor(
    private readonly getCurrentMemberUseCase: GetCurrentMemberUseCase,
    private readonly findMemberUseCase: FindMemberUseCase
  ) {}

  @Swagger.getCurrentMember('현재 로그인한 사용자 정보 조회')
  @Get(API_ENDPOINTS.GET_CURRENT_MEMBER)
  async getCurrentMember(@CurrentRequester() requester: Requester): Promise<MemberDto> {
    const member = await this.getCurrentMemberUseCase.execute(requester.id);
    return MemberDto.from(member);
  }

  @Swagger.findMember('특정 사용자 정보 조회')
  @UseGuards(MemberAccessGuard)
  @Get(API_ENDPOINTS.FIND_MEMBER)
  async findMember(@Param('memberId') memberId: string): Promise<MemberDto> {
    const member = await this.findMemberUseCase.execute(memberId);
    return MemberDto.from(member);
  }
}
