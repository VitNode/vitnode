'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const DarkLightModeSwitcher = () => {
  const t = useTranslations('core');
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" tooltip={t('user-bar.theme.toggle')}>
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={id => {
            setTheme(id);
          }}
        >
          <DropdownMenuRadioItem value="light" onClick={() => setTheme('light')}>
            <span>{t('user-bar.theme.light')}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={() => setTheme('dark')}>
            <span>{t('user-bar.theme.dark')}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" onClick={() => setTheme('system')}>
            <span>{t('user-bar.theme.system')}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
