'use client';

import { useState, useEffect } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'h-8 w-8 px-0 !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0'
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="sr-only">Switch language</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'h-8 w-8 px-0 !outline-none !ring-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 data-[focus]:!outline-none data-[focus]:!ring-0'
        )}
      >
        <Globe className="h-4 w-4" />
        <span className="sr-only">Switch language</span>
      </DropdownMenuTrigger>

      {/* 언어 변경기 */}
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
