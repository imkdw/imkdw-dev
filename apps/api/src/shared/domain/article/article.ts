export class Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  seriesId: string;
  viewCount: number;
  readMinute: number;
  createdAt: Date;
  tagIds: string[];

  private constructor(props: Article) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.content = props.content;
    this.seriesId = props.seriesId;
    this.viewCount = props.viewCount;
    this.readMinute = props.readMinute;
    this.createdAt = props.createdAt;
    this.tagIds = props.tagIds;
  }

  static create(props: Article): Article {
    return new Article(props);
  }

  static calculateReadMinute(content: string): number {
    const KOREAN_CHARS_PER_MINUTE = 300;
    const ENGLISH_WORDS_PER_MINUTE = 200;
    const MINIMUM_READ_MINUTE = 1;

    const cleanContent = content.replace(/```[\s\S]*?```/g, '');
    const koreanCharCount = (cleanContent.match(/[가-힣]/g) ?? []).length;
    const englishWordCount = (cleanContent.match(/[a-zA-Z]+/g) ?? []).length;

    const koreanReadTime = koreanCharCount / KOREAN_CHARS_PER_MINUTE;
    const englishReadTime = englishWordCount / ENGLISH_WORDS_PER_MINUTE;

    const totalReadTime = Math.ceil(koreanReadTime + englishReadTime);
    return Math.max(totalReadTime, MINIMUM_READ_MINUTE);
  }
}
