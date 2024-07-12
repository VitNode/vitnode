'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export const ThemeSwitcher = () => {
  const t = useTranslations('core.user-bar.dark_light_switcher');
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          ariaLabel={t('toggle')}
        >
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
          <DropdownMenuRadioItem
            value="light"
            onClick={() => setTheme('light')}
          >
            <span>{t('light')}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={() => setTheme('dark')}>
            <span>{t('dark')}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="system"
            onClick={() => setTheme('system')}
          >
            <span>{t('system')}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
