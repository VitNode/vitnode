import { Monitor, Moon, Smartphone, Sun, Tablet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useTheme } from 'next-themes';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export enum ThemeEditorViewEnum {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export const ToolbarThemeEditor = ({
  activeMode,
  setActiveMode,
}: {
  activeMode: ThemeEditorViewEnum;
  setActiveMode: (mode: ThemeEditorViewEnum) => void;
}) => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');
  const { resolvedTheme, setTheme, theme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? 'light';

  const ButtonWithTooltip = ({
    active,
    ariaLabel,
    children,
    onClick,
  }: {
    active: boolean;
    ariaLabel: string;
    children: React.ReactNode;
    onClick: () => void;
  }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              ariaLabel={ariaLabel}
              variant={active ? 'default' : 'ghost'}
              className="relative shrink-0"
              onClick={onClick}
            >
              {children}
            </Button>
          </TooltipTrigger>

          <TooltipContent side="left">{ariaLabel}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="flex w-14 flex-col items-center gap-4 border-e">
      <div className="flex flex-col gap-1 py-2">
        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Desktop}
          onClick={() => setActiveMode(ThemeEditorViewEnum.Desktop)}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Desktop}`)}
        >
          <Monitor />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Tablet}
          onClick={() => setActiveMode(ThemeEditorViewEnum.Tablet)}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Tablet}`)}
        >
          <Tablet />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Mobile}
          onClick={() => setActiveMode(ThemeEditorViewEnum.Mobile)}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Mobile}`)}
        >
          <Smartphone />
        </ButtonWithTooltip>
      </div>

      <div className="flex flex-col gap-1 py-2">
        <ButtonWithTooltip
          active={activeTheme === 'light'}
          onClick={() => setTheme('light')}
          ariaLabel={tCore('user-bar.dark_light_switcher.light')}
        >
          <Sun />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeTheme === 'dark'}
          onClick={() => setTheme('dark')}
          ariaLabel={tCore('user-bar.dark_light_switcher.dark')}
        >
          <Moon />
        </ButtonWithTooltip>
      </div>
    </div>
  );
};
