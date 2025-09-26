export interface TerminalCommand {
  command: string;
  delay?: number;
}

import type { IResponseGetStatsDto } from '@imkdw-dev/types';

export interface TerminalContentProps {
  commands: TerminalCommand[];
  currentCommand: string;
  showCursor: boolean;
  isClient: boolean;
}

export interface StatsGridProps {
  stats: IResponseGetStatsDto;
}

export interface Props {
  commands: TerminalCommand[];
  title: string;
  description: string;
  stats: IResponseGetStatsDto;
  tags: string[];
  className?: string;
}
