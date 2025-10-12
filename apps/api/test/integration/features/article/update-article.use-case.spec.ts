import { UpdateArticleUseCase } from '@/features/article/use-case/update-article.use-case';
import { ArticleValidator } from '@/shared/validator/article.validator';
import { SeriesValidator } from '@/shared/validator/series.validator';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { SeriesRepository } from '@/shared/repository/series/series.repository';
import { TagRepository } from '@/shared/repository/tag/tag.repository';
import { SeriesStatsService } from '@/shared/services/series/series-stats.service';
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
      SeriesStatsService,
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
        seriesId: testSeries.id,
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
        seriesId: testSeries.id,
      });
      await createTestArticle(prisma, {
        title: duplicateTitle,
        seriesId: anotherSeries.id,
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
      expect(updatedArticle?.readMinute).toBeGreaterThan(0);
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
          { id: 'old-tag-1', name: 'OldTag1' },
          { id: 'old-tag-2', name: 'OldTag2' },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'old-tag-1' },
          { articleId: existingArticle.id, tagId: 'old-tag-2' },
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
      expect(articleTags.map(at => at.tag.name)).toEqual(expect.arrayContaining(['JavaScript', 'React', 'TypeScript']));

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
        data: { id: 'existing-tag-id', name: 'JavaScript' },
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
      expect(articleTags.map(at => at.tag.name)).toEqual(expect.arrayContaining(['JavaScript', 'React', 'Vue']));
    });

    it('게시글에서 모든 태그를 제거할 수 있다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.createMany({
        data: [
          { id: 'tag-1', name: 'Tag1' },
          { id: 'tag-2', name: 'Tag2' },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'tag-1' },
          { articleId: existingArticle.id, tagId: 'tag-2' },
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
          { id: 'old-tag-1', name: 'OldTag1' },
          { id: 'old-tag-2', name: 'OldTag2' },
        ],
      });
      await prisma.articleTag.createMany({
        data: [
          { articleId: existingArticle.id, tagId: 'old-tag-1' },
          { articleId: existingArticle.id, tagId: 'old-tag-2' },
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
      expect(articleTags.map(at => at.tag.name)).toEqual(expect.arrayContaining(['NewTag1', 'NewTag2', 'NewTag3']));
    });

    it('트랜잭션 롤백시 태그 관계가 원상복구된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '기존 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.tag.create({
        data: { id: 'original-tag', name: 'OriginalTag' },
      });
      await prisma.articleTag.create({
        data: {
          articleId: existingArticle.id,
          tagId: 'original-tag',
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

  describe('게시글 수정 시 시리즈 통계가 갱신되면', () => {
    it('게시글 내용 수정으로 읽기 시간이 변경되면 시리즈 총 읽기 시간이 갱신된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글 제목',
        content: '짧은 내용.',
        seriesId: testSeries.id,
      });

      await createTestArticle(prisma, {
        title: '다른 게시글',
        content: '다른 게시글 내용. '.repeat(30),
        seriesId: testSeries.id,
      });

      const initialSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      const initialTotalReadMinute = initialSeries?.totalReadMinute ?? 0;

      const updateArticleDto: UpdateArticleDto = {
        title: '수정된 게시글 제목',
        content: '매우 긴 내용으로 수정됩니다. '.repeat(200),
        seriesId: testSeries.id,
        tags: [],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const updatedSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      expect(updatedSeries?.articleCount).toBe(2);
      expect(updatedSeries?.totalReadMinute).toBeGreaterThan(initialTotalReadMinute);
    });
  });

  describe('게시글을 다른 시리즈로 이동하면', () => {
    it('이전 시리즈와 새 시리즈의 통계가 모두 갱신된다', async () => {
      const firstArticle = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용. '.repeat(50),
        seriesId: testSeries.id,
      });
      await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용. '.repeat(30),
        seriesId: testSeries.id,
      });

      await createTestArticle(prisma, {
        title: '다른 시리즈 게시글',
        content: '다른 시리즈 게시글 내용. '.repeat(40),
        seriesId: anotherSeries.id,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 2,
          totalReadMinute:
            Math.ceil('첫 번째 게시글 내용. '.repeat(50).length / 300) +
            Math.ceil('두 번째 게시글 내용. '.repeat(30).length / 300),
          lastArticleCreatedAt: new Date(),
        },
      });
      await prisma.series.update({
        where: { id: anotherSeries.id },
        data: {
          articleCount: 1,
          totalReadMinute: Math.ceil('다른 시리즈 게시글 내용. '.repeat(40).length / 300),
          lastArticleCreatedAt: new Date(),
        },
      });

      const initialFirstSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      const initialSecondSeries = await prisma.series.findUnique({ where: { id: anotherSeries.id } });

      expect(initialFirstSeries?.articleCount).toBe(2);
      expect(initialSecondSeries?.articleCount).toBe(1);

      const updateArticleDto: UpdateArticleDto = {
        title: '이동된 게시글',
        content: '이동된 게시글 내용. '.repeat(60),
        seriesId: anotherSeries.id,
        tags: [],
      };

      await sut.execute(firstArticle.id, updateArticleDto);

      const updatedFirstSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      const updatedSecondSeries = await prisma.series.findUnique({ where: { id: anotherSeries.id } });

      expect(updatedFirstSeries?.articleCount).toBe(1);
      expect(updatedFirstSeries?.totalReadMinute).toBeLessThan(initialFirstSeries?.totalReadMinute ?? 0);

      expect(updatedSecondSeries?.articleCount).toBe(2);
      expect(updatedSecondSeries?.totalReadMinute).toBeGreaterThan(initialSecondSeries?.totalReadMinute ?? 0);
    });

    it('시리즈에서 마지막 게시글을 이동하면 lastArticleCreatedAt이 재계산된다', async () => {
      const firstArticle = await createTestArticle(prisma, {
        title: '첫 번째 게시글',
        content: '첫 번째 게시글 내용',
        seriesId: testSeries.id,
      });

      await new Promise(resolve => setTimeout(resolve, 10));
      const secondArticle = await createTestArticle(prisma, {
        title: '두 번째 게시글',
        content: '두 번째 게시글 내용',
        seriesId: testSeries.id,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 2,
          totalReadMinute: 2,
          lastArticleCreatedAt: secondArticle.createdAt,
        },
      });

      const initialSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      expect(initialSeries?.lastArticleCreatedAt?.getTime()).toBeCloseTo(secondArticle.createdAt.getTime(), -2);

      const updateArticleDto: UpdateArticleDto = {
        title: '이동된 게시글',
        content: '이동된 게시글 내용',
        seriesId: anotherSeries.id,
        tags: [],
      };

      await sut.execute(secondArticle.id, updateArticleDto);

      const updatedFirstSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      const updatedSecondSeries = await prisma.series.findUnique({ where: { id: anotherSeries.id } });

      expect(updatedFirstSeries?.lastArticleCreatedAt?.getTime()).toBeCloseTo(firstArticle.createdAt.getTime(), -2);
      expect(updatedFirstSeries?.articleCount).toBe(1);

      expect(updatedSecondSeries?.lastArticleCreatedAt?.getTime()).toBeCloseTo(secondArticle.createdAt.getTime(), -2);
      expect(updatedSecondSeries?.articleCount).toBe(1);
    });

    it('시리즈의 모든 게시글을 다른 시리즈로 이동하면 원래 시리즈는 빈 상태가 된다', async () => {
      const onlyArticle = await createTestArticle(prisma, {
        title: '유일한 게시글',
        content: '유일한 게시글 내용. '.repeat(50),
        seriesId: testSeries.id,
      });

      await prisma.series.update({
        where: { id: testSeries.id },
        data: {
          articleCount: 1,
          totalReadMinute: Math.ceil('유일한 게시글 내용. '.repeat(50).length / 300),
          lastArticleCreatedAt: onlyArticle.createdAt,
        },
      });

      const initialSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      expect(initialSeries?.articleCount).toBe(1);
      expect(initialSeries?.totalReadMinute).toBeGreaterThan(0);
      expect(initialSeries?.lastArticleCreatedAt).not.toBeNull();

      const updateArticleDto: UpdateArticleDto = {
        title: '이동된 유일한 게시글',
        content: '이동된 유일한 게시글 내용. '.repeat(60),
        seriesId: anotherSeries.id,
        tags: [],
      };

      await sut.execute(onlyArticle.id, updateArticleDto);

      const updatedFirstSeries = await prisma.series.findUnique({ where: { id: testSeries.id } });
      const updatedSecondSeries = await prisma.series.findUnique({ where: { id: anotherSeries.id } });

      expect(updatedFirstSeries?.articleCount).toBe(0);
      expect(updatedFirstSeries?.totalReadMinute).toBe(0);
      expect(updatedFirstSeries?.lastArticleCreatedAt).toBeNull();

      expect(updatedSecondSeries?.articleCount).toBe(1);
      expect(updatedSecondSeries?.totalReadMinute).toBeGreaterThan(0);
      expect(updatedSecondSeries?.lastArticleCreatedAt).not.toBeNull();
    });
  });

  describe('HTML 태그가 포함된 내용으로 게시글을 수정하면', () => {
    it('HTML 태그가 제거된채로 저장된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글',
        content: '기존 내용입니다.',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: 'HTML 포함 수정 게시글',
        content: '<p>수정된 내용입니다</p>\n<div>추가 내용입니다</div>',
        seriesId: testSeries.id,
        tags: [],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.plainContent).toBe('수정된 내용입니다 추가 내용입니다');
      expect(updatedArticle?.plainContent).not.toContain('<p>');
      expect(updatedArticle?.plainContent).not.toContain('</p>');
      expect(updatedArticle?.plainContent).not.toContain('<div>');
      expect(updatedArticle?.plainContent).not.toContain('</div>');
    });

    it('순수한 텍스트로 수정하면 그대로 저장된다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글',
        content: '<h1>기존 제목</h1><p>기존 내용</p>',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '순수 텍스트로 수정',
        content: '이제는 HTML 태그가 없는 순수 텍스트입니다.',
        seriesId: testSeries.id,
        tags: [],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.plainContent).toBe('이제는 HTML 태그가 없는 순수 텍스트입니다.');
      expect(updatedArticle?.content).toBe(updatedArticle?.plainContent);
    });

    it('여러 HTML 요소와 중첩 구조를 정확히 제거한다', async () => {
      const existingArticle = await createTestArticle(prisma, {
        title: '기존 게시글',
        content: '기존 내용',
        seriesId: testSeries.id,
      });

      const updateArticleDto: UpdateArticleDto = {
        title: '복잡한 HTML 수정',
        content: `
          <article>
            <header><h2>섹션 제목</h2></header>
            <section>
              <p>첫 번째 <em>강조된</em> 내용</p>
              <blockquote>인용문입니다</blockquote>
            </section>
            <footer>
              <a href="/link">링크</a>
            </footer>
          </article>
        `,
        seriesId: testSeries.id,
        tags: ['HTML', 'Test'],
      };

      await sut.execute(existingArticle.id, updateArticleDto);

      const updatedArticle = await prisma.article.findUnique({ where: { id: existingArticle.id } });
      expect(updatedArticle?.plainContent).toBe('섹션 제목 첫 번째 강조된 내용 인용문입니다 링크');
      expect(updatedArticle?.plainContent).not.toContain('<');
      expect(updatedArticle?.plainContent).not.toContain('>');
      expect(updatedArticle?.plainContent).not.toMatch(/\s{2,}/);
    });
  });
});
