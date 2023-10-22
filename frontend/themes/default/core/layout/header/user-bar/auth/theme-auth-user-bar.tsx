import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Check, Moon, Sun } from 'lucide-react';

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';

export const ThemeAuthUserBar = () => {
  const t = useTranslations('core');
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>{t('user-bar.theme.title')}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent className="w-40">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              {theme === 'light' && <Check className="mr-2 h-4 w-4" />}
              <span>{t('user-bar.theme.light')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              {theme === 'dark' && <Check className="mr-2 h-4 w-4" />}
              <span>{t('user-bar.theme.dark')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              {theme === 'system' && <Check className="mr-2 h-4 w-4" />}
              <span>{t('user-bar.theme.system')}</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
};
