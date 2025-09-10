import { Search, TrendingUp, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const BlogHeader = () => {
  const navigate = useNavigate();
  const popularTags = [
    'React', 'TypeScript', 'Node.js', 'Frontend', 'Backend', 'JavaScript'
  ];

  const recentStats = [
    { label: '오늘 새 글', value: '2' },
    { label: '이번 주', value: '8' },
    { label: '전체 글', value: '127' }
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="container px-4 py-8">
        {/* 블로그 헤더 */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              개발자를 위한 기술 블로그
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              웹 개발, 프로그래밍 튜토리얼, 그리고 최신 기술 트렌드에 대한 깊이 있는 인사이트
            </p>
          </div>

          {/* 검색과 통계 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* 검색 */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="글 제목, 태그, 시리즈로 검색..."
                  className="pl-10 pr-4 h-12 text-base"
                />
              </div>
            </div>

            {/* 간단한 통계 */}
            <div className="flex justify-center md:justify-end items-center space-x-6">
              {recentStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 인기 태그 */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">인기 태그</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground smooth-transition"
                  onClick={() => navigate(`/articles?tag=${tag}`)}
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;