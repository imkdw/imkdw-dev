import type { PrismaClient, Series } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import { generateUUID } from '@/common/utils/string.util';

export const createTestSeries = async (
  prisma: PrismaClient | Prisma.TransactionClient,
  data?: Partial<Prisma.SeriesCreateInput>
): Promise<Series> => {
  return prisma.series.create({
    data: {
      id: generateUUID(),
      title: data?.title ?? `Test Series ${Date.now()}`,
      slug: data?.slug ?? `test-series-${Date.now()}`,
      description: data?.description ?? `Test Series Description ${Date.now()}`,
      ...data,
    },
  });
};
