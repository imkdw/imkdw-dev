import { GetTagListQuery } from '@/features/tag/query/get-tag-list.query';
import { createTestTag } from '@test/integration/helpers/tag.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { generateUUID } from '@/common/utils/string.util';

describe('GetTagListQuery', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetTagListQuery;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetTagListQuery]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetTagListQuery);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('태그가 없을 때', () => {
    describe('조회하면', () => {
      it('빈 배열을 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result).toEqual([]);
      });
    });
  });

  describe('태그가 여러 개 있을 때', () => {
    beforeEach(async () => {
      await Promise.all([
        createTestTag(prisma, { id: generateUUID(), name: 'TypeScript' }),
        createTestTag(prisma, { id: generateUUID(), name: 'React' }),
        createTestTag(prisma, { id: generateUUID(), name: 'Node.js' }),
      ]);
    });

    describe('조회하면', () => {
      it('모든 태그를 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(3);
        expect(result.map(tag => tag.name)).toContain('TypeScript');
        expect(result.map(tag => tag.name)).toContain('React');
        expect(result.map(tag => tag.name)).toContain('Node.js');
      });
    });
  });

  describe('정상 태그와 삭제된 태그가 섞여 있을 때', () => {
    beforeEach(async () => {
      await Promise.all([
        createTestTag(prisma, {
          id: generateUUID(),
          name: '정상 태그',
        }),
        createTestTag(prisma, {
          id: generateUUID(),
          name: '삭제된 태그',
          deletedAt: new Date(),
        }),
      ]);
    });

    describe('조회하면', () => {
      it('삭제되지 않은 태그만 반환해야 한다', async () => {
        const result = await sut.execute();

        expect(result).toHaveLength(1);
        expect(result[0]?.name).toBe('정상 태그');
      });
    });
  });

  describe('서로 다른 날짜에 만든 태그들이 있을 때', () => {
    beforeEach(async () => {
      await Promise.all([
        createTestTag(prisma, {
          id: generateUUID(),
          name: '첫 번째',
          createdAt: new Date('2025-01-01T00:00:00Z'),
        }),
        createTestTag(prisma, {
          id: generateUUID(),
          name: '세 번째',
          createdAt: new Date('2025-01-03T00:00:00Z'),
        }),
        createTestTag(prisma, {
          id: generateUUID(),
          name: '두 번째',
          createdAt: new Date('2025-01-02T00:00:00Z'),
        }),
      ]);
    });

    describe('조회하면', () => {
      it('생성일 순서대로 정렬되어야 한다', async () => {
        const result = await sut.execute();

        expect(result[0]?.name).toBe('첫 번째');
        expect(result[1]?.name).toBe('두 번째');
        expect(result[2]?.name).toBe('세 번째');
      });
    });
  });
});
