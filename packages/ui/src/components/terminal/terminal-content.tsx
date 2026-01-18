import { TerminalCommand } from './type';

interface Props {
  commands: TerminalCommand[];
  currentCommand: string;
  showCursor: boolean;
  isClient: boolean;
}

export function TerminalContent({ commands, currentCommand, showCursor, isClient }: Props) {
  return (
    <div className="terminal-content flex-1 flex flex-col justify-center p-3 md:p-4">
      <div className="space-y-2">
        <div className="terminal-prompt">
          <span className="prompt-symbol">→</span>
          <span className="prompt-path text-xs md:text-sm">~/imkdw-dev</span>
          <span className="text-code-comment text-xs md:text-sm">(main)</span>
          <span className="prompt-symbol">$</span>
        </div>

        <div className="flex items-center">
          <span className="text-terminal-foreground mr-2 text-xs md:text-sm">$</span>
          <span className="text-xs md:text-sm text-code-foreground">
            {isClient ? currentCommand : (commands[0]?.command ?? '')}
            {isClient && showCursor && <span className="bg-terminal-foreground text-terminal-bg px-1">_</span>}
          </span>
        </div>

        <div className="text-terminal-foreground/80 text-xs md:text-sm space-y-1">
          <div>Cloning into &apos;imkdw-dev&apos;...</div>
          <div className="sm:block">remote: Enumerating objects: 1247, done.</div>
          <div className="sm:block">Receiving objects: 100% (1247/1247), 2.1 MiB | 850.00 KiB/s</div>
          <div className="text-terminal-success">Ready to code!</div>
        </div>
      </div>
    </div>
  );
}
