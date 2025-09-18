import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { GetCurrentMemberUseCase } from './use-case/get-current-member.use-case';
import { FindMemberUseCase } from './use-case/find-member.use-case';

@Module({
  controllers: [MemberController],
  providers: [GetCurrentMemberUseCase, FindMemberUseCase],
})
export class MemberModule {}