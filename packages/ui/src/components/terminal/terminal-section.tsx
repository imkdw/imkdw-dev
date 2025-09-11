'use client';

import { useState, useEffect } from 'react';
import { TerminalHeader } from './terminal-header';
import { TerminalContent } from './terminal-content';
import { BlogInfo } from './blog-info';
import { StatsGrid } from './stats-grid';
import { TagsList } from './tags-list';
import { Props } from './types';

export const TerminalSection = ({ commands, title, description, stats, tags, className = '' }: Props) => {
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
        const currentCmd = commands[commandIndex];
        if (!currentCmd) return;

        const command = currentCmd.command;
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
          }, currentCmd.delay || 2000);
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
            <TerminalHeader />
            <TerminalContent 
              commands={commands}
              currentCommand={currentCommand}
              showCursor={showCursor}
              isClient={isClient}
            />
          </div>

          {/* 블로그 정보 */}
          <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-center">
            <BlogInfo title={title} description={description} />
            <StatsGrid stats={stats} />
            <TagsList tags={tags} />
          </div>
        </div>
      </div>
    </section>
  );
};
