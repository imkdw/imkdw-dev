import { BookOpen } from 'lucide-react';

interface Props {
  translations: {
    empty: string;
    emptyDescription: string;
  };
}

export function SeriesListEmpty({ translations }: Props) {
  return (
    <div className="flex flex-col items-center py-12">
      <BookOpen className="h-16 w-16 text-muted-foreground pb-4" />
      <h3 className="text-lg font-semibold pb-2">{translations.empty}</h3>
      <p className="text-muted-foreground">{translations.emptyDescription}</p>
    </div>
  );
}
