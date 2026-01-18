import { Terminal } from 'lucide-react';
import { MacOSControls } from '../../primitives';

export function TerminalHeader() {
  const title = '@imkdw-dev/blog - zsh';

  return (
    <div className="flex bg-muted border-b border-border px-4 py-3">
      <div className="flex items-center space-x-2">
        <MacOSControls />
        <div className="flex items-center space-x-2">
          <Terminal className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          <span className="text-xs md:text-sm">{title}</span>
        </div>
      </div>
    </div>
  );
}
