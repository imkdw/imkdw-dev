import { GetCurrentMemberUseCase } from '@/features/member/use-case/get-current-member.use-case';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import { Member } from '@prisma/client';

describe('현재 사용자 정보 조회 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: GetCurrentMemberUseCase;
  let prisma: PrismaService;
  let testMember: Member;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([GetCurrentMemberUseCase, MemberRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(GetCurrentMemberUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testMember = await createTestMember(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('정상적인 경우', () => {
    it('존재하는 사용자 ID로 조회하면 사용자 정보를 반환한다', async () => {
      // When
      const result = await sut.execute(testMember.id);

      // Then
      expect(result).toBeDefined();
      expect(result.id).toBe(testMember.id);
      expect(result.email).toBe(testMember.email);
      expect(result.profileImage).toBe(testMember.profileImage);
      expect(result.role).toBe(testMember.role);
      expect(result.provider).toBe(testMember.provider);
    });
  });

  describe('예외적인 경우', () => {
    it('존재하지 않는 사용자 ID로 조회하면 MemberNotFoundException을 발생시킨다', async () => {
      // Given
      const nonExistentId = 'non-existent-id';

      // When & Then
      await expect(sut.execute(nonExistentId)).rejects.toThrow(MemberNotFoundException);
    });

    it('삭제된 사용자 ID로 조회하면 MemberNotFoundException을 발생시킨다', async () => {
      // Given
      await prisma.member.update({
        where: { id: testMember.id },
        data: { deletedAt: new Date() },
      });

      // When & Then
      await expect(sut.execute(testMember.id)).rejects.toThrow(MemberNotFoundException);
    });
  });
});
