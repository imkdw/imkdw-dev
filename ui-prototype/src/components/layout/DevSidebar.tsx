import { 
  FolderOpen, 
  File, 
  ChevronRight, 
  ChevronDown,
  Hash,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const DevSidebar = () => {
  const [expandedFolders, setExpandedFolders] = useState({
    articles: true,
    series: true,
    tags: false,
  });

  const toggleFolder = (folder: keyof typeof expandedFolders) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  const recentArticles = [
    { name: 'react-18-features.md', type: 'file', size: '4.2kb' },
    { name: 'nodejs-typescript.md', type: 'file', size: '6.8kb' },
    { name: 'css-grid-flexbox.md', type: 'file', size: '3.1kb' },
    { name: 'async-programming.md', type: 'file', size: '5.5kb' },
  ];

  const series = [
    { name: 'React 마스터하기', files: 8, icon: '⚛️' },
    { name: '백엔드 개발 기초', files: 12, icon: '🔧' },
    { name: 'JavaScript 심화', files: 6, icon: '🟨' },
  ];

  const popularTags = [
    { name: 'React', count: 24, color: 'text-blue-400' },
    { name: 'TypeScript', count: 18, color: 'text-blue-600' },
    { name: 'Node.js', count: 15, color: 'text-green-400' },
    { name: 'Frontend', count: 32, color: 'text-purple-400' },
    { name: 'Backend', count: 21, color: 'text-orange-400' },
  ];

  return (
    <aside className="w-64 lg:w-80 border-r border-border bg-muted/30 flex flex-col h-full">
      {/* Explorer header */}
      <div className="p-3 border-b border-border/50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <FolderOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium font-mono">EXPLORER</span>
        </div>
      </div>

      {/* File tree */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-2 space-y-1">
          {/* Recent Articles */}
          <div className="space-y-1">
            <button
              onClick={() => toggleFolder('articles')}
              className="file-tree-item w-full"
            >
              {expandedFolders.articles ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
              <FolderOpen className="h-3 w-3 text-accent" />
              <span className="font-medium">articles/</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {recentArticles.length}
              </Badge>
            </button>
            
            {expandedFolders.articles && (
              <div className="ml-4 space-y-1">
                {recentArticles.map((article) => (
                  <div key={article.name} className="file-tree-item pl-2">
                    <File className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs truncate">{article.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {article.size}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Series */}
          <div className="space-y-1">
            <button
              onClick={() => toggleFolder('series')}
              className="file-tree-item w-full"
            >
              {expandedFolders.series ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
              <FolderOpen className="h-3 w-3 text-primary" />
              <span className="font-medium">series/</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {series.length}
              </Badge>
            </button>
            
            {expandedFolders.series && (
              <div className="ml-4 space-y-1">
                {series.map((s) => (
                  <div key={s.name} className="file-tree-item pl-2">
                    <span className="text-xs">{s.icon}</span>
                    <span className="text-xs truncate">{s.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {s.files}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Popular Tags */}
          <div className="space-y-1">
            <button
              onClick={() => toggleFolder('tags')}
              className="file-tree-item w-full"
            >
              {expandedFolders.tags ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
              <Hash className="h-3 w-3 text-accent" />
              <span className="font-medium">tags/</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {popularTags.length}
              </Badge>
            </button>
            
            {expandedFolders.tags && (
              <div className="ml-4 space-y-1">
                {popularTags.map((tag) => (
                  <div key={tag.name} className="file-tree-item pl-2">
                    <Hash className={`h-3 w-3 ${tag.color}`} />
                    <span className="text-xs truncate">{tag.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {tag.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terminal status */}
      <div className="border-t border-border/50 p-3 flex-shrink-0">
        <div className="terminal-prompt">
          <span className="prompt-symbol">$</span>
          <span className="prompt-path">~/devblog</span>
          <span className="text-muted-foreground text-xs">main</span>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>127 posts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Updated 2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DevSidebar;