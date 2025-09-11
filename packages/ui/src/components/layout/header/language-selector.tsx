'use client';

import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '../../../primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../primitives/dropdown-menu';

interface Props {
  currentLanguage?: string;
  onLanguageChange?: (languageCode: string) => void;
}

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export function LanguageSelector({ currentLanguage = 'ko', onLanguageChange }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const getCurrentLanguage = () => languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageChange?.(languageCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
          <Globe className="h-3 w-3 mr-1" />
          {getCurrentLanguage()?.flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs">언어 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${selectedLanguage === language.code ? 'bg-muted' : ''}`}
          >
            <span className="mr-2">{language.flag}</span>
            <span className="text-sm">{language.name}</span>
            {selectedLanguage === language.code && <span className="ml-auto text-xs text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
