import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { MemberRepository } from './member/member.repository';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [MemberRepository],
  exports: [MemberRepository],
})
export class RepositoryModule {}
