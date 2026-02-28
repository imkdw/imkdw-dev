import { Card, CardHeader, CardTitle, CardDescription, Badge } from '@imkdw-dev/ui';
import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  status: string;
}

export function ToolCard({ icon: Icon, title, description, status }: Props) {
  return (
    <Card className="border border-border hover:border-accent hover:shadow-md cursor-not-allowed opacity-80 transition-all">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-muted-foreground" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="px-6 pb-6">
        <Badge variant="outline">{status}</Badge>
      </div>
    </Card>
  );
}
