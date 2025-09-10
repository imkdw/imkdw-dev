import { useState, useEffect } from 'react';
import { ChevronRight, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

const TableOfContents = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // article 태그 내부의 헤딩 요소만 찾아 목차 생성
    const article = document.querySelector('article');
    if (!article) return;
    
    const headings = article.querySelectorAll('h2, h3, h4');
    const items: TocItem[] = [];

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const title = heading.textContent || '';
      const id = `heading-${index}`;
      
      // 헤딩에 id 추가 (아직 없는 경우)
      if (!heading.id) {
        heading.id = id;
      }
      
      items.push({
        id: heading.id,
        title: title.replace(/^💡\s/, ''), // 이모지 제거
        level
      });
    });

    setTocItems(items);
  }, []);

  useEffect(() => {
    // 스크롤 위치에 따른 활성 헤딩 추적
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id));
      const scrollTop = window.scrollY;

      let currentActiveId = '';
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollTop + 100) {
          currentActiveId = heading.id;
          break;
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 헤더 높이 고려
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <List className="h-4 w-4" />
              Table of Contents
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-auto p-1"
            >
              <ChevronRight 
                className={`h-4 w-4 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}
              />
            </Button>
          </div>
        </CardHeader>
        
        {!isCollapsed && (
          <CardContent className="pt-0">
            <nav className="space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`
                    block w-full text-left text-sm transition-colors hover:text-primary
                    ${item.level === 2 ? 'pl-0 font-medium' : ''}
                    ${item.level === 3 ? 'pl-4 text-muted-foreground' : ''}
                    ${item.level === 4 ? 'pl-8 text-muted-foreground text-xs' : ''}
                    ${activeId === item.id ? 'text-primary font-medium' : ''}
                    py-1.5 rounded-sm hover:bg-muted/50 px-2 -mx-2
                  `}
                >
                  <span className="line-clamp-2">{item.title}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default TableOfContents;