import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { MemberRepository } from './member/member.repository';

@Module({
  imports: [DatabaseModule],
  providers: [MemberRepository],
  exports: [MemberRepository],
})
export class RepositoryModule {}
