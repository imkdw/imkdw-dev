import { Article } from '@/shared/domain/article/article';

describe('Article 도메인', () => {
  describe('calculateReadMinute', () => {
    it('한글 300자로 1분 계산', () => {
      const content = '안녕하세요'.repeat(60); // 300자
      const readMinute = Article.calculateReadMinute(content);
      expect(readMinute).toBe(1);
    });

    it('영어 200단어로 1분 계산', () => {
      const content = 'hello '.repeat(200); // 200단어
      const readMinute = Article.calculateReadMinute(content);
      expect(readMinute).toBe(1);
    });

    it('한글과 영어 혼합 텍스트 계산', () => {
      const content = '안녕하세요'.repeat(30) + 'hello '.repeat(100); // 150자 + 100단어 = 0.5분 + 0.5분 = 1분
      const readMinute = Article.calculateReadMinute(content);
      expect(readMinute).toBe(1);
    });

    it('코드 블록 제외하고 계산', () => {
      const content = '안녕하세요'.repeat(60) + '\n```\nconst code = "excluded";\n```\n';
      const readMinute = Article.calculateReadMinute(content);
      expect(readMinute).toBe(1);
    });

    it('빈 문자열은 최소 1분', () => {
      const readMinute = Article.calculateReadMinute('');
      expect(readMinute).toBe(1);
    });
  });

  describe('create', () => {
    it('Article 인스턴스를 생성한다', () => {
      const props = {
        id: 'test-id',
        title: '테스트 제목',
        slug: 'test-slug',
        content: '테스트 내용',
        seriesId: 'series-id',
        viewCount: 0,
        readMinute: 2,
        createdAt: new Date(),
        tagIds: ['tag1', 'tag2'],
      };

      const article = Article.create(props);

      expect(article.id).toBe(props.id);
      expect(article.title).toBe(props.title);
      expect(article.slug).toBe(props.slug);
      expect(article.content).toBe(props.content);
      expect(article.seriesId).toBe(props.seriesId);
      expect(article.viewCount).toBe(props.viewCount);
      expect(article.readMinute).toBe(props.readMinute);
      expect(article.createdAt).toBe(props.createdAt);
      expect(article.tagIds).toEqual(props.tagIds);
    });
  });
});
