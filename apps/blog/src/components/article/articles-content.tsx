import { ITagDto, IResponseGetArticlesDto } from '@imkdw-dev/types';
import { FileText, Tag } from 'lucide-react';
// import { ArticlesFilter } from './articles-filter';
import { ArticlesList } from './articles-list';
import { CommonPagination } from '@/components/common/common-pagination';
import { ListHeader } from '@/components/common/list-header';
import { Locale } from '@imkdw-dev/i18n';

interface Props {
  articlesData: IResponseGetArticlesDto;
  tags: ITagDto[];
  currentPage: number;
  translations: {
    title: string;
    totalArticles: string;
    tags: string;
    searchPlaceholder: string;
    noResults: string;
    filterAll: string;
  };
  locale: Locale;
}

export function ArticlesContent({ articlesData, tags, currentPage, translations, locale }: Props) {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [selectedTag, setSelectedTag] = useState('all');
  // const [sortBy, setSortBy] = useState('latest');

  const { items: articles, totalCount, totalPage } = articlesData;

  // const filteredArticles = articles.filter(article => {
  //   const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesSearch;
  // });

  const createPageUrl = (page: number) => `/articles?page=${page}`;

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
      <ListHeader
        title={translations.title}
        stats={[
          { label: translations.totalArticles, value: totalCount, icon: FileText },
          { label: translations.tags, value: tags.length, icon: Tag },
        ]}
      />
      {/* <ArticlesFilter
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        sortBy={sortBy}
        tags={tags}
        onSearchChange={setSearchQuery}
        onTagChange={setSelectedTag}
        onSortChange={setSortBy}
      /> */}
      <ArticlesList articles={articles} translations={{ noResults: translations.noResults }} locale={locale} />
      <CommonPagination totalPages={totalPage} currentPage={currentPage} createPageUrl={createPageUrl} />
    </div>
  );
}
