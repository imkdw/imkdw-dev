import { FindMemberUseCase } from '@/features/member/use-case/find-member.use-case';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { Member } from '@prisma/client';

describe('사용자 정보 조회 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: FindMemberUseCase;
  let prisma: PrismaService;
  let testMember: Member;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([FindMemberUseCase, MemberRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(FindMemberUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testMember = await createTestMember(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 유저로 조회를 요청하면', () => {
    it('예외가 발생한다', async () => {
      await expect(sut.execute('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(MemberNotFoundException);
    });
  });

  describe('삭제된 유저를 조회하면', () => {
    it('예외가 발생한다', async () => {
      await prisma.member.update({
        where: { id: testMember.id },
        data: { deletedAt: new Date() },
      });

      await expect(sut.execute(testMember.id)).rejects.toThrow(MemberNotFoundException);
    });
  });

  describe('존재하는 유저를 조회하면', () => {
    it('사용자 정보를 반환한다', async () => {
      const result = await sut.execute(testMember.id);

      expect(result.id).toBe(testMember.id);
    });
  });
});
