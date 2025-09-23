import type { PrismaClient, Tag } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { generateUUID } from '@/common/utils/string.util';

export const createTestTag = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data?: Partial<Prisma.TagCreateInput>
): Promise<Tag> => {
  return prisma.tag.create({
    data: {
      id: generateUUID(),
      name: data?.name ?? `Test Tag ${Date.now()}`,
      ...data,
    },
  });
};
