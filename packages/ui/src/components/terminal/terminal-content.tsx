import { TerminalContentProps } from './types';

export function TerminalContent({ commands, currentCommand, showCursor, isClient }: TerminalContentProps) {
  return (
    <div className="terminal-content flex-1 flex flex-col justify-center p-3 md:p-4">
      <div className="space-y-2">
        <div className="terminal-prompt">
          <span className="prompt-symbol">→</span>
          <span className="prompt-path text-xs md:text-sm">~/imkdw-dev</span>
          <span className="text-muted-foreground text-xs md:text-sm">(main)</span>
          <span className="prompt-symbol">$</span>
        </div>

        <div className="flex items-center">
          <span className="text-primary mr-2 text-xs md:text-sm">$</span>
          <span className="text-xs md:text-sm">
            {isClient ? currentCommand : commands[0]?.command ?? ''}
            {isClient && showCursor && <span className="bg-primary text-primary-foreground px-1">_</span>}
          </span>
        </div>

        <div className="text-primary/80 text-xs md:text-sm space-y-1">
          <div>Cloning into &apos;imkdw-dev&apos;...</div>
          <div className="hidden sm:block">remote: Enumerating objects: 1247, done.</div>
          <div className="hidden sm:block">Receiving objects: 100% (1247/1247), 2.1 MiB | 850.00 KiB/s, done.</div>
          <div className="text-green-500">Ready to code!</div>
        </div>
      </div>
    </div>
  );
}
