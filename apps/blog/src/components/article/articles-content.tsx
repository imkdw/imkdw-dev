import { ITagDto, IResponseGetArticlesDto } from '@imkdw-dev/types';
import { FileText, Tag } from 'lucide-react';
// import { ArticlesFilter } from './articles-filter';
import { ArticlesList } from './articles-list';
import { CommonPagination } from '@/components/common/common-pagination';
import { ListHeader } from '@/components/common/list-header';

interface Props {
  articlesData: IResponseGetArticlesDto;
  tags: ITagDto[];
  currentPage: number;
}

export function ArticlesContent({ articlesData, tags, currentPage }: Props) {
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
        title="게시글"
        stats={[
          { label: '전체 게시글', value: totalCount, icon: FileText },
          { label: '태그', value: tags.length, icon: Tag },
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
      <ArticlesList articles={articles} />
      <CommonPagination totalPages={totalPage} currentPage={currentPage} createPageUrl={createPageUrl} />
    </div>
  );
}
