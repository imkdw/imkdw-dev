import type { PrismaClient, Member } from '@prisma/client';
import type { Prisma } from '@prisma/client';

export const createTestMember = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data?: { id?: string; email?: string; nickname?: string; profileImage?: string; providerId?: string; provider?: string; role?: string }
): Promise<Member> => {
  return prisma.member.create({
    data: {
      id: data?.id ?? `test-member-${Date.now()}`,
      email: data?.email ?? `test${Date.now()}@example.com`,
      nickname: data?.nickname ?? `테스트유저${Date.now()}`,
      profileImage: data?.profileImage ?? 'https://example.com/profile.png',
      providerId: data?.providerId ?? `google-${Date.now()}`,
      provider: data?.provider ?? 'google',
      role: data?.role ?? 'USER',
    },
  });
};
