import { ReactNode } from 'react';

interface KeyInsightProps {
  title?: string;
  children: ReactNode;
}

export function KeyInsight({ title = '💡 Key Insight', children }: KeyInsightProps) {
  return (
    <div className="bg-card border rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}
