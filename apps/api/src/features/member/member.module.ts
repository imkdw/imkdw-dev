import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { GetCurrentMemberUseCase } from './use-case/get-current-member.use-case';

@Module({
  controllers: [MemberController],
  providers: [GetCurrentMemberUseCase],
})
export class MemberModule {}