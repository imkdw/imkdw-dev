import { ArticleContent } from '@/shared/domain/article/article-content';

interface Params {
  id: string;
  title: string;
  slug: string;
  content: string;
  plainContent: string;
  seriesId: string;
  viewCount: number;
  readMinute: number;
  state: string;
  createdAt: Date;
  tagIds: string[];
}

export class Article {
  id: string;
  title: string;
  slug: string;
  content: ArticleContent;
  plainContent: string;
  seriesId: string;
  viewCount: number;
  readMinute: number;
  state: string;
  createdAt: Date;
  tagIds: string[];

  private constructor(props: Params) {
    this.id = props.id;
    this.title = props.title;
    this.slug = props.slug;
    this.content = new ArticleContent(props.content);
    this.plainContent = this.content.toPlainText();
    this.seriesId = props.seriesId;
    this.viewCount = props.viewCount;
    this.readMinute = props.readMinute;
    this.state = props.state;
    this.createdAt = props.createdAt;
    this.tagIds = props.tagIds;
  }

  static create(props: Params): Article {
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
