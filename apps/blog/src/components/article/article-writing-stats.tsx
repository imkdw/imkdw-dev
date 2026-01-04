import { Card } from '@imkdw-dev/ui';

interface Props {
  content: string;
  translations: {
    characters: string;
    words: string;
    readingTime: string;
    minutes: string;
  };
}

export function ArticleWritingStats({ content, translations }: Props) {
  const characterCount = content.length;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Card className="p-4 sm:p-6 shadow-sm hover:shadow-md">
      <div className="space-y-3.5 text-sm">
        <div className="flex justify-between items-center p-2.5 rounded-lg bg-background/50 hover:bg-background transition-colors">
          <span className="text-muted-foreground font-medium">{translations.characters}</span>
          <span className="font-mono font-semibold text-foreground">{characterCount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center p-2.5 rounded-lg bg-background/50 hover:bg-background transition-colors">
          <span className="text-muted-foreground font-medium">{translations.words}</span>
          <span className="font-mono font-semibold text-foreground">{wordCount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center p-2.5 rounded-lg bg-background/50 hover:bg-background transition-colors">
          <span className="text-muted-foreground font-medium">{translations.readingTime}</span>
          <span className="font-mono font-semibold text-primary">
            {readingTime}
            {translations.minutes}
          </span>
        </div>
      </div>
    </Card>
  );
}
