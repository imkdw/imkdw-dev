import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { UpdateArticleDto } from '@/features/article/dto/update-article.dto';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { ExistArticleException } from '@/features/article/exception/exist-article.exception';
import { SeriesNotFoundException } from '@/features/series/exception/series-not-found.exception';
import { createTestArticle } from '@test/integration/helpers/article.helper';
import { createTestSeries } from '@test/integration/helpers/series.helper';
import { IntegrationTestHelper } from '@test/integration/helpers/integration-test.helper';
import { PrismaService } from '@/infra/database/prisma.service';
import type { Series } from '@prisma/client';

describe('게시글 수정 유스케이스', () => {
  let testHelper: IntegrationTestHelper;
  let sut: UpdateArticleUseCase;
  let prisma: PrismaService;
  let testSeries: Series;
  let anotherSeries: Series;

  beforeAll(async () => {
    testHelper = new IntegrationTestHelper([
      UpdateArticleUseCase,
      ArticleValidator,
      SeriesValidator,
      ArticleRepository,
      SeriesRepository,
      TagRepository,
    ]);
    await testHelper.setup();
  });

  beforeEach(async () => {
    sut = testHelper.getService(UpdateArticleUseCase);
    await testHelper.startTransaction();
    prisma = testHelper.getPrisma();
    testSeries = await createTestSeries(prisma);
    anotherSeries = await createTestSeries(prisma);
  });

  afterEach(() => {
    testHelper.rollbackTransaction();
  });

  describe('존재하지 않는 게시글을 수정하면', () => {
    it('에러가 발생한다', async () => {
      const nonExistentId = 'non-existent-id';
      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
        tags: ['JavaScript'],
      };

      await expect(sut.execute(nonExistentId, updateArticleDto)).rejects.toThrow(ArticleNotFoundException);
    });
  });

  describe('존재하지 않는 시리즈 ID로 수정하면', () => {
    it('에러가 발생한다', async () => {
      const existingArticle = await createTestArticle(prisma, { 
        title: '기존 게시글 제목',
        seriesId: testSeries.id 
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: '123e4567-e89b-12d3-a456-426614174000', // 존재하지 않는 ID
        tags: ['JavaScript'],
      };

      await expect(sut.execute(existingArticle.id, updateArticleDto)).rejects.toThrow(SeriesNotFoundException);
    });
  });

  describe('다른 게시글과 제목이 중복되면', () => {
    const duplicateTitle = '중복된 게시글 제목';

    it('에러가 발생한다', async () => {
      const existingArticle = await createTestArticle(prisma, { 
        title: '기존 게시글 제목',
        seriesId: testSeries.id 
      });
      await createTestArticle(prisma, { 
        title: duplicateTitle,
        seriesId: anotherSeries.id 
      });

      const updateArticleDto: UpdateArticleDto = {
        title: duplicateTitle,
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
        tags: ['React'],
      };

      await expect(sut.execute(existingArticle.id, updateArticleDto)).rejects.toThrow(ExistArticleException);
    });
  });

  describe('정상적인 게시글 수정하면', () => {
    it('같은 제목으로 수정하는 것은 허용된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: existingArticle.title,
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
        tags: ['Vue'],
      };

      await expect(sut.execute(existingArticle.id, updateArticleDto)).resolves.not.toThrow();

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.content).toBe(updateArticleDto.content);
      expect(updatedArticle?.seriesId).toBe(testSeries.id);
    });

    it('게시글이 수정된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: anotherSeries.id,
        tags: ['Node.js'],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.title).toBe(updateArticleDto.title);
      expect(updatedArticle?.content).toBe(updateArticleDto.content);
      expect(updatedArticle?.seriesId).toBe(anotherSeries.id);
    });
  });

  describe('해시태그와 함께 게시글을 수정하면', () => {
    it('완전히 새로운 태그들로 수정된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.createMany({
        data: [
          { id: 'old-tag-1', name: 'OldTag1', createdAt: new Date() },
          { id: 'old-tag-2', name: 'OldTag2', createdAt: new Date() },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'old-tag-1', createdAt: new Date(), updatedAt: new Date() },
          { articleId: existingArticle.id, tagId: 'old-tag-2', createdAt: new Date(), updatedAt: new Date() },
        ],
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
        tags: ['JavaScript', 'React', 'TypeScript'],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const newTags = await prisma.tag.findMany({
        where: { name: { in: updateArticleDto.tags } },
      });
      expect(newTags).toHaveLength(3);

      const articleTags = await prisma.articleTag.findMany({
        where: { articleId: existingArticle.id },
        include: { tag: true },
      });
      expect(articleTags).toHaveLength(3);
      expect(articleTags.map(at => at.tag.name)).toEqual(
        expect.arrayContaining(['JavaScript', 'React', 'TypeScript'])
      );

      const oldTagRelations = await prisma.articleTag.findMany({
        where: {
          articleId: existingArticle.id,
          tagId: { in: ['old-tag-1', 'old-tag-2'] },
        },
      });
      expect(oldTagRelations).toHaveLength(0);
    });

    it('기존 태그를 재사용하고 새로운 태그만 생성한다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.create({
        data: { id: 'existing-tag-id', name: 'JavaScript', createdAt: new Date() },
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
        tags: ['JavaScript', 'React', 'Vue'],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const allTags = await prisma.tag.findMany({
        where: { name: { in: updateArticleDto.tags } },
      });
      expect(allTags).toHaveLength(3);

      const existingTag = allTags.find(tag => tag.name === 'JavaScript');
      expect(existingTag?.id).toBe('existing-tag-id');

      const articleTags = await prisma.articleTag.findMany({
        where: { articleId: existingArticle.id },
        include: { tag: true },
      });
      expect(articleTags).toHaveLength(3);
      expect(articleTags.map(at => at.tag.name)).toEqual(
        expect.arrayContaining(['JavaScript', 'React', 'Vue'])
      );
    });

    it('게시글에서 모든 태그를 제거할 수 있다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.createMany({
        data: [
          { id: 'tag-1', name: 'Tag1', createdAt: new Date() },
          { id: 'tag-2', name: 'Tag2', createdAt: new Date() },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'tag-1', createdAt: new Date(), updatedAt: new Date() },
          { articleId: existingArticle.id, tagId: 'tag-2', createdAt: new Date(), updatedAt: new Date() },
        ],
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '수정된 게시글 내용입니다.',
        seriesId: testSeries.id,
        tags: [],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const articleTags = await prisma.articleTag.findMany({
        where: { articleId: existingArticle.id },
      });
      expect(articleTags).toHaveLength(0);
    });

    it('태그를 다른 태그들로 완전히 교체할 수 있다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.createMany({
        data: [
          { id: 'old-tag-1', name: 'OldTag1', createdAt: new Date() },
          { id: 'old-tag-2', name: 'OldTag2', createdAt: new Date() },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'old-tag-1', createdAt: new Date(), updatedAt: new Date() },
          { articleId: existingArticle.id, tagId: 'old-tag-2', createdAt: new Date(), updatedAt: new Date() },
        ],
      });

      const updateArticleDto: UpdateArticleDto = {
        title: existingArticle.title,
        content: existingArticle.content,
        seriesId: testSeries.id,
        tags: ['NewTag1', 'NewTag2', 'NewTag3'],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const oldTagRelations = await prisma.articleTag.findMany({
        where: {
          articleId: existingArticle.id,
          tagId: { in: ['old-tag-1', 'old-tag-2'] },
        },
      });
      expect(oldTagRelations).toHaveLength(0);

      const articleTags = await prisma.articleTag.findMany({
        where: { articleId: existingArticle.id },
        include: { tag: true },
      });
      expect(articleTags).toHaveLength(3);
      expect(articleTags.map(at => at.tag.name)).toEqual(
        expect.arrayContaining(['NewTag1', 'NewTag2', 'NewTag3'])
      );
    });

    it('트랜잭션 롤백시 태그 관계가 원상복구된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.create({
        data: { id: 'original-tag', name: 'OriginalTag', createdAt: new Date() },
      });
      await prisma.articleTag.create({
        data: {
          articleId: existingArticle.id,
          tagId: 'original-tag',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      testHelper.rollbackTransaction();
      await testHelper.startTransaction();

      const articleTagsAfterRollback = await prisma.articleTag.findMany({
        where: { articleId: existingArticle.id },
      });
      expect(articleTagsAfterRollback).toHaveLength(0);
    });
  });
});