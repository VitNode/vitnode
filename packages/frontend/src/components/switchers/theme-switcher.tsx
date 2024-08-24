'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const ThemeSwitcher = () => {
  const t = useTranslations('core.user-bar.dark_light_switcher');
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ariaLabel={t('toggle')}
          className="relative"
          size="icon"
          variant="ghost"
        >
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          onValueChange={id => {
            setTheme(id);
          }}
          value={theme}
        >
          <DropdownMenuRadioItem
            onClick={() => {
              setTheme('light');
            }}
            value="light"
          >
            <span>{t('light')}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              setTheme('dark');
            }}
            value="dark"
          >
            <span>{t('dark')}</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => {
              setTheme('system');
            }}
            value="system"
          >
            <span>{t('system')}</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
