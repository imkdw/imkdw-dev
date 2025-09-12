import { cn } from '../../lib';

interface Props {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export function MetaInfoItem({ icon, text, className }: Props) {
  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {icon}
      <span>{text}</span>
    </div>
  );
}