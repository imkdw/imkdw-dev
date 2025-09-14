import { Injectable } from '@nestjs/common';
import { Member } from '@/shared/domain/member/member';
import { MemberMapper } from '@/shared/mapper/member/member.mapper';
import { PrismaService } from '@/infra/database/prisma.service';

@Injectable()
export class MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(member: Member): Promise<Member> {
    const updatedEntity = await this.prisma.member.update({
      where: { id: member.id },
      data: member,
    });
    return MemberMapper.toDomain(updatedEntity);
  }

  async create(member: Member): Promise<Member> {
    const createdEntity = await this.prisma.member.create({ data: member });
    return MemberMapper.toDomain(createdEntity);
  }

  async findByOAuth(provider: string, providerId: string): Promise<Member | null> {
    const entity = await this.prisma.member.findFirst({
      where: {
        provider,
        providerId,
        deletedAt: null,
      },
    });

    return entity ? MemberMapper.toDomain(entity) : null;
  }

  async findById(id: string): Promise<Member | null> {
    const entity = await this.prisma.member.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    return entity ? MemberMapper.toDomain(entity) : null;
  }
}
