import { UpdateMemberUseCase } from '@/features/member/use-case/update-member.use-case';
import { MemberValidator } from '@/shared/validator/member.validator';
import { MemberRepository } from '@/shared/repository/member/member.repository';
import { STORAGE_SERVICE, StorageService } from '@/infra/storage/storage.service';
import { UpdateMemberDto } from '@/features/member/dto/update-member.dto';
import { ExistMemberNicknameException } from '@/features/member/exception/exist-member-nickname.exception';
import { MemberNotFoundException } from '@/features/member/exception/member-not-found.exception';
import { CopyImageService } from '@/shared/services/image/copy-image.service';
import { createTestMember } from '@test/integration/helpers/member.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Member } from '@prisma/client';
import { randomUUID } from 'crypto';

const WEB_IMAGE_URL = 'https://example.com/profile.jpg';
const mockStorageService: jest.Mocked<StorageService> = {
  upload: jest.fn(),
  getTempUploadUrl: jest.fn(),
  copyTempFile: jest.fn().mockResolvedValue(WEB_IMAGE_URL),
};

describe('유저 정보 수정 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: UpdateMemberUseCase;
  let prisma: PrismaService;
  let testMember: Member;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      UpdateMemberUseCase,
      MemberValidator,
      MemberRepository,
      CopyImageService,
      {
        provide: STORAGE_SERVICE,
        useValue: mockStorageService,
      },
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(UpdateMemberUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testMember = await createTestMember(prisma);
    mockStorageService.copyTempFile.mockClear();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 멤버를 수정하려는 경우', () => {
    it('예외가 발생한다', async () => {
      const nonExistentMemberId = randomUUID();
      const updateMemberDto: UpdateMemberDto = {
        nickname: '새로운닉네임',
        profileImage: WEB_IMAGE_URL,
      };

      await expect(sut.execute(nonExistentMemberId, updateMemberDto)).rejects.toThrow(MemberNotFoundException);
    });
  });

  describe('기존에 존재하는 닉네임으로 수정하려는 경우', () => {
    it('예외가 발생한다', async () => {
      const anotherMember = await createTestMember(prisma, {
        nickname: '이미존재하는닉네임',
      });

      const updateMemberDto: UpdateMemberDto = {
        nickname: anotherMember.nickname,
        profileImage: WEB_IMAGE_URL,
      };

      await expect(sut.execute(testMember.id, updateMemberDto)).rejects.toThrow(ExistMemberNicknameException);
    });
  });

  describe('기존에 없던 닉네임으로 수정하는 경우', () => {
    it('정상적으로 수정된다', async () => {
      const newNickname = '새로운고유닉네임';
      const updateMemberDto: UpdateMemberDto = {
        nickname: newNickname,
        profileImage: WEB_IMAGE_URL,
      };

      await expect(sut.execute(testMember.id, updateMemberDto)).resolves.not.toThrow();

      const updatedMember = await prisma.member.findUnique({ where: { id: testMember.id } });
      expect(updatedMember?.nickname).toBe(newNickname);
    });
  });

  describe('새로운 이미지를 업로드하는 경우', () => {
    const newImage = 'https://new.image.com';

    it('주소가 변경되어서 저장된다', async () => {
      const updateMemberDto: UpdateMemberDto = {
        nickname: '새로운닉네임',
        profileImage: newImage,
      };

      await sut.execute(testMember.id, updateMemberDto);

      const updatedMember = await prisma.member.findUnique({ where: { id: testMember.id } });

      expect(updatedMember?.profileImage).toBe(WEB_IMAGE_URL);
    });
  });
});
