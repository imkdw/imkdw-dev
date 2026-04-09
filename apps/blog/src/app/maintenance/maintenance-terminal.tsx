'use client';

import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { MacOSControls } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { cn } from '@imkdw-dev/ui/lib';

interface LogLine {
  text: string;
  color: 'foreground' | 'accent' | 'warning' | 'error' | 'success' | 'comment';
  delay: number;
}

const LOG_LINES: LogLine[] = [
  { text: '$ pnpm run maintenance:start', color: 'foreground', delay: 0 },
  { text: '', color: 'foreground', delay: 300 },
  { text: '> @imkdw-dev/blog@1.0.0 maintenance:start', color: 'comment', delay: 600 },
  { text: '> Initializing maintenance mode...', color: 'comment', delay: 900 },
  { text: '', color: 'foreground', delay: 1100 },
  { text: '✓ Database migration in progress', color: 'warning', delay: 1400 },
  { text: '✓ Cache invalidation complete', color: 'success', delay: 1800 },
  { text: '⠋ Deploying new features...', color: 'accent', delay: 2200 },
  { text: '', color: 'foreground', delay: 2500 },
  { text: '// 더 나은 서비스를 위해 점검을 진행하고 있습니다', color: 'comment', delay: 2800 },
  { text: '// 잠시 후 다시 방문해주세요', color: 'comment', delay: 3200 },
];

const colorMap: Record<LogLine['color'], string> = {
  foreground: 'text-terminal-foreground',
  accent: 'text-terminal-accent',
  warning: 'text-terminal-warning',
  error: 'text-terminal-error',
  success: 'text-terminal-success',
  comment: 'text-code-comment',
};

export function MaintenanceTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < LOG_LINES.length; i++) {
      const line = LOG_LINES[i];
      if (!line) continue;
      timeouts.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, line.delay)
      );
    }
    return () => timeouts.forEach(clearTimeout);
  }, [isClient]);

  return (
    <div className={cn('w-full max-w-2xl', jetBrainsMono.className)}>
      <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg shadow-lg">
        <div className="flex items-center border-b border-terminal-border bg-terminal-header px-4 py-3">
          <div className="flex items-center space-x-2">
            <MacOSControls />
            <div className="flex items-center space-x-2">
              <Terminal className="h-3.5 w-3.5 text-terminal-foreground" />
              <span className="text-xs text-terminal-text">maintenance — zsh</span>
            </div>
          </div>
        </div>

        <div className="terminal-content p-4 md:p-6">
          <div className="space-y-1">
            <div className="terminal-prompt mb-3">
              <span className="prompt-symbol">→</span>
              <span className="prompt-path text-xs md:text-sm">~/imkdw-dev</span>
              <span className="text-xs text-code-comment md:text-sm">(main)</span>
            </div>

            {isClient &&
              LOG_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={cn('text-xs md:text-sm', colorMap[line.color])}>
                  {line.text === '' ? '\u00A0' : line.text}
                </div>
              ))}

            {!isClient && <div className="text-xs text-code-comment md:text-sm">Loading...</div>}

            {isClient && visibleLines >= LOG_LINES.length && (
              <div className="mt-3 flex items-center">
                <span className="mr-2 text-xs text-terminal-foreground md:text-sm">$</span>
                {showCursor && <span className="inline-block h-4 w-2 bg-terminal-foreground" />}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-warning opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-terminal-warning" />
        </span>
        <span className="text-xs text-muted-foreground">System maintenance in progress</span>
      </div>
    </div>
  );
}
