import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { GetCurrentMemberUseCase } from './use-case/get-current-member.use-case';
import { FindMemberUseCase } from './use-case/find-member.use-case';
import { GetMemberStatsQuery } from './query/get-member-stats.query';

@Module({
  controllers: [MemberController],
  providers: [GetCurrentMemberUseCase, FindMemberUseCase, GetMemberStatsQuery],
})
export class MemberModule {}
