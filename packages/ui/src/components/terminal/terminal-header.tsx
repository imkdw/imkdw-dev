import { Terminal } from 'lucide-react';
import { TerminalHeaderProps } from './types';

export function TerminalHeader({ title = '@imkdw-dev/blog - zsh' }: TerminalHeaderProps) {
  return (
    <div className="terminal-header">
      <div className="flex items-center space-x-2">
        <div className="window-controls">
          <div className="control-dot close"></div>
          <div className="control-dot minimize"></div>
          <div className="control-dot maximize"></div>
        </div>
        <div className="flex items-center space-x-2">
          <Terminal className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          <span className="text-xs md:text-sm font-jetbrains">{title}</span>
        </div>
      </div>
    </div>
  );
}