import { CreateArticleUseCase } from '@/features/article/use-case/create-article.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { CreateArticleDto } from '@/features/article/dto/create-article.dto';
import { ExistArticleException } from '@/features/article/exception/exist-article.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';

describe('게시글 생성 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: CreateArticleUseCase;
  let prisma: PrismaService;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([CreateArticleUseCase, ArticleValidator, ArticleRepository]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(CreateArticleUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('동일한 제목의 게시글이 이미 존재하면', () => {
    const existingTitle = '이미 존재하는 게시글 제목';

    it('에러가 발생한다', async () => {
      await createTestArticle(prisma, { title: existingTitle });
      const createArticleDto: CreateArticleDto = {
        title: existingTitle,
        slug: 'existing-article-slug',
        content: '새로운 게시글 내용입니다.',
      };

      await expect(sut.execute(createArticleDto)).rejects.toThrow(ExistArticleException);
    });
  });

  describe('새로운 게시글을 생성하면', () => {
    it('게시글이 생성된다', async () => {
      const createArticleDto: CreateArticleDto = {
        title: '새로운 게시글 제목',
        slug: 'new-article-slug',
        content: '테스트 게시글 내용입니다.',
      };

      const result = await sut.execute(createArticleDto);

      const savedArticle = await prisma.article.findUnique({ where: { id: result.id } });
      expect(savedArticle).not.toBeNull();
      expect(savedArticle?.title).toBe(createArticleDto.title);
      expect(savedArticle?.content).toBe(createArticleDto.content);
    });
  });
});
