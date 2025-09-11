'use client';

import { useState, useEffect } from 'react';

export interface TerminalCommand {
  command: string;
  delay?: number;
}

export interface TerminalSectionProps {
  commands?: TerminalCommand[];
  title?: string;
  description?: string;
  stats?: Array<{
    label: string;
    value: string;
    color?: string;
  }>;
  tags?: string[];
  className?: string;
}

export const TerminalSection = ({
  commands = [
    { command: 'git clone https://github.com/imkdw/blog.git' },
    { command: 'cd blog && npm install' },
    { command: 'npm run dev' },
    { command: 'echo "Welcome to my blog! 🚀"' }
  ],
  title = 'const Blog = "개발자를 위한 공간"',
  description = '최신 웹 기술, 프로그래밍 튜토리얼, 그리고 실무에서 바로 활용할 수 있는 코드 예제들을 제공합니다.',
  stats = [
    { label: '총 게시글', value: '127', color: 'text-primary' },
    { label: '진행 시리즈', value: '15', color: 'text-accent' },
    { label: '총 조회수', value: '45.2k', color: 'text-green-500' },
    { label: '기술 태그', value: '32', color: 'text-accent' }
  ],
  tags = ['React', 'TypeScript', 'Node.js', 'Frontend', 'Backend'],
  className = ''
}: TerminalSectionProps) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // SSR 안전성을 위한 클라이언트 체크
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 커서 깜빡임 효과
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, [isClient]);

  // 타이핑 애니메이션
  useEffect(() => {
    if (!isClient) return;
    
    let commandIndex = 0;
    let charIndex = 0;
    
    const typeCommand = () => {
      if (commandIndex < commands.length) {
        const command = commands[commandIndex].command;
        if (charIndex < command.length) {
          setCurrentCommand(command.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeCommand, 50);
        } else {
          setTimeout(() => {
            commandIndex++;
            charIndex = 0;
            if (commandIndex < commands.length) {
              setCurrentCommand('');
              setTimeout(typeCommand, 500);
            }
          }, commands[commandIndex].delay || 2000);
        }
      } else {
        // 애니메이션 재시작
        setTimeout(() => {
          commandIndex = 0;
          charIndex = 0;
          setCurrentCommand('');
          setTimeout(typeCommand, 1000);
        }, 3000);
      }
    };

    setTimeout(typeCommand, 1000);
  }, [commands, isClient]);

  return (
    <section className={`py-4 md:py-6 lg:py-8 bg-muted/20 border-b border-border ${className}`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch">
          {/* 터미널 창 */}
          <div className="terminal-window h-full flex flex-col min-h-[300px] md:min-h-[350px]">
            {/* 터미널 헤더 */}
            <div className="terminal-header">
              <div className="flex items-center space-x-2">
                <div className="window-controls">
                  <div className="control-dot close"></div>
                  <div className="control-dot minimize"></div>
                  <div className="control-dot maximize"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-3 w-3 md:h-4 md:w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                  <span className="text-xs md:text-sm font-mono">blog - zsh</span>
                </div>
              </div>
            </div>
            
            {/* 터미널 콘텐츠 */}
            <div className="terminal-content flex-1 flex flex-col justify-center p-3 md:p-4">
              <div className="space-y-2">
                <div className="terminal-prompt">
                  <span className="prompt-symbol">→</span>
                  <span className="prompt-path text-xs md:text-sm">~/blog</span>
                  <span className="text-muted-foreground text-xs md:text-sm">(main)</span>
                  <span className="prompt-symbol">$</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-primary mr-2 text-xs md:text-sm">$</span>
                  <span className="font-mono text-xs md:text-sm">
                    {isClient ? currentCommand : commands[0]?.command || ''}
                    {isClient && showCursor && <span className="bg-primary text-primary-foreground px-1">_</span>}
                  </span>
                </div>
                
                <div className="text-primary/80 text-xs md:text-sm space-y-1">
                  <div>Cloning into 'blog'...</div>
                  <div className="hidden sm:block">remote: Enumerating objects: 1247, done.</div>
                  <div className="hidden sm:block">Receiving objects: 100% (1247/1247), 2.1 MiB | 850.00 KiB/s, done.</div>
                  <div className="text-green-500">✨ Ready to code!</div>
                </div>
              </div>
            </div>
          </div>

          {/* 블로그 정보 */}
          <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-center">
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">
                <span className="text-blue-500">const</span>{' '}
                <span className="text-primary">Blog</span>{' '}
                <span className="text-muted-foreground">=</span>{' '}
                <span className="text-amber-500">"{title.split('"')[1] || title}"</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {description}
              </p>
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="p-2 md:p-3 lg:p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className={`text-base md:text-lg lg:text-2xl font-bold font-mono ${stat.color || 'text-primary'} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-1 md:gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-mono border border-primary/20 hover:bg-primary/20 cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;