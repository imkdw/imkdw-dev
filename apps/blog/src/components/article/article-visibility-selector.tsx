'use client';

import { Card, RadioGroup, RadioGroupItem } from '@imkdw-dev/ui';
import { ARTICLE_STATE } from '@imkdw-dev/consts';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  translations: {
    title: string;
    public: string;
    publicDescription: string;
    private: string;
    privateDescription: string;
    label: string;
  };
}

export function ArticleVisibilitySelector({ value, onValueChange, translations }: Props) {
  return (
    <Card className="p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <label className="text-sm font-medium mb-3">{translations.title}</label>
        <RadioGroup value={value} onValueChange={onValueChange}>
          <RadioGroupItem value={ARTICLE_STATE.NORMAL}>
            <div>
              <div className="text-sm font-medium">{translations.public}</div>
              <div className="text-xs text-muted-foreground/70">{translations.publicDescription}</div>
            </div>
          </RadioGroupItem>
          <RadioGroupItem value={ARTICLE_STATE.HIDDEN}>
            <div>
              <div className="text-sm font-medium">{translations.private}</div>
              <div className="text-xs text-muted-foreground/70">{translations.privateDescription}</div>
            </div>
          </RadioGroupItem>
        </RadioGroup>
        <p className="text-xs text-muted-foreground/70 mt-2">{translations.label}</p>
      </div>
    </Card>
  );
}
