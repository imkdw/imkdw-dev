import { ExistArticleException } from '@/features/article/exception/exist-article.exception';
import { ExistArticleSlugException } from '@/features/article/exception/exist-article-slug.exception';
import { ArticleNotFoundException } from '@/features/article/exception/article-not-found.exception';
import { ArticleRepository } from '@/shared/repository/article/article.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleValidator {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async checkExistTitle(title: string, excludeId?: string) {
    const article = await this.articleRepository.findByTitle(title);

    if (article && article.id !== excludeId) {
      throw new ExistArticleException(`${title}은 이미 존재하는 게시글 제목입니다`);
    }
  }

  async checkExistSlug(slug: string) {
    const article = await this.articleRepository.findBySlug(slug);

    if (article) {
      throw new ExistArticleSlugException(`${slug}은 이미 존재하는 게시글 슬러그입니다`);
    }
  }

  async checkExist(id: string) {
    const article = await this.articleRepository.findById(id);

    if (!article) {
      throw new ArticleNotFoundException(`게시글을 찾을 수 없습니다`);
    }

    return article;
  }
}
