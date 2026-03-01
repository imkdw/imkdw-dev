import { Card, CardHeader, CardTitle, CardDescription } from '@imkdw-dev/ui';
import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ToolCard({ icon: Icon, title, description }: Props) {
  return (
    <Card className="border border-border hover:border-accent hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
