import { Article } from '@/shared/domain/article/article';

describe('게시글', () => {
  describe('읽기 시간 계산', () => {
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
});
