import { Sun, Moon, Monitor } from 'lucide-react';
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
  theme?: string;
  onThemeChange?: (theme: string) => void;
}

const themes = [
  { value: 'light', label: '라이트', icon: Sun },
  { value: 'dark', label: '다크', icon: Moon },
  { value: 'system', label: '시스템', icon: Monitor },
];

export function ThemeSelector({ theme = 'system', onThemeChange }: Props) {
  const getCurrentTheme = () => themes.find(t => t.value === theme) ?? themes[0];

  const handleThemeChange = (themeValue: string) => {
    onThemeChange?.(themeValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
          {(() => {
            const ThemeIcon = getCurrentTheme()?.icon;
            return ThemeIcon ? <ThemeIcon className="h-3 w-3 mr-1" /> : null;
          })()}
          {getCurrentTheme()?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel className="text-xs">테마 선택</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map(themeOption => {
          const Icon = themeOption.icon;
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => handleThemeChange(themeOption.value)}
              className={`cursor-pointer ${theme === themeOption.value ? 'bg-muted' : ''}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="text-sm">{themeOption.label}</span>
              {theme === themeOption.value && <span className="ml-auto text-xs text-primary">✓</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}