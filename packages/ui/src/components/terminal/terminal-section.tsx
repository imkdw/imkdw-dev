'use client';

import { useState, useEffect } from 'react';
import { TerminalHeader } from './terminal-header';
import { TerminalContent } from './terminal-content';
import { StatsGrid } from './stats-grid';
import { Props } from './types';
import { cn } from '../../lib';
import { jetBrainsMono } from '@imkdw-dev/fonts';

export const TerminalSection = ({ commands, title, description, stats, tags, className = '' }: Props) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) {
      return;
    }

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
          }, currentCmd.delay ?? 2000);
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
    <section
      className={cn('py-4 md:py-6 lg:py-8 bg-muted/20 border-b border-border', className, jetBrainsMono.className)}
    >
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
            <div>
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">
                <span className="text-blue-500">const</span> <span className="text-primary">@imkdw-dev/blog</span>{' '}
                <span className="text-muted-foreground">=</span>{' '}
                <span className="text-amber-500">&quot;{title.split('"')[1] ?? title}&quot;</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</p>
            </div>
            <StatsGrid stats={stats} />
            <div className="flex flex-wrap gap-1 md:gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="tracking-wider inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm border border-primary/20 hover:bg-primary/20 cursor-pointer transition-colors"
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
