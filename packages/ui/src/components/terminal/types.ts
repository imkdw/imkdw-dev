export interface TerminalCommand {
  command: string;
  delay?: number;
}

export interface StatItem {
  label: string;
  value: string;
  color?: string;
}

export interface TerminalContentProps {
  commands: TerminalCommand[];
  currentCommand: string;
  showCursor: boolean;
  isClient: boolean;
}

export interface BlogInfoProps {
  title: string;
  description: string;
}

export interface StatsGridProps {
  stats: StatItem[];
}

export interface TagsListProps {
  tags: string[];
}

export interface Props {
  commands: TerminalCommand[];
  title: string;
  description: string;
  stats: StatItem[];
  tags: string[];
  className?: string;
}
