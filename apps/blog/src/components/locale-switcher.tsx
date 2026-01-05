'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  buttonVariants,
} from '@imkdw-dev/ui';
import { Globe } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { cn } from '@imkdw-dev/ui';

const localeNames: Record<string, string> = {
  ko: '한국어',
  en: 'English',
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-8 w-8 px-0')}>
        <Globe className="h-4 w-4" />
        <span className="sr-only">Switch language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map(loc => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={locale === loc ? 'bg-muted' : ''}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
