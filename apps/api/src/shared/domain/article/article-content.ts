export class ArticleContent {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * 게시글 본문에 존재하는 HTML 태그를 제거하고 텍스트만 추출해서 반환
   */
  toPlainText(): string {
    return this.value
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
