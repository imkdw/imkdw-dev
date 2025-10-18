import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { GetCurrentMemberUseCase } from './use-case/get-current-member.use-case';
import { FindMemberUseCase } from './use-case/find-member.use-case';
import { UpdateMemberUseCase } from './use-case/update-member.use-case';
import { GetMemberStatsQuery } from './query/get-member-stats.query';
import { StorageModule } from '@/infra/storage/storage.module';
import { SharedImageModule } from '@/shared/services/image/shared-image.module';

@Module({
  imports: [StorageModule, SharedImageModule],
  controllers: [MemberController],
  providers: [GetCurrentMemberUseCase, FindMemberUseCase, UpdateMemberUseCase, GetMemberStatsQuery],
})
export class MemberModule {}
