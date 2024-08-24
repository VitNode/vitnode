import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Monitor, Moon, Smartphone, Sun, Tablet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React from 'react';

export enum ThemeEditorViewEnum {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet',
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
              ariaLabel={ariaLabel}
              className="relative shrink-0"
              onClick={onClick}
              size="icon"
              variant={active ? 'default' : 'ghost'}
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
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Desktop}`)}
          onClick={() => {
            setActiveMode(ThemeEditorViewEnum.Desktop);
          }}
        >
          <Monitor />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Tablet}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Tablet}`)}
          onClick={() => {
            setActiveMode(ThemeEditorViewEnum.Tablet);
          }}
        >
          <Tablet />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeMode === ThemeEditorViewEnum.Mobile}
          ariaLabel={t(`theme_editor.${ThemeEditorViewEnum.Mobile}`)}
          onClick={() => {
            setActiveMode(ThemeEditorViewEnum.Mobile);
          }}
        >
          <Smartphone />
        </ButtonWithTooltip>
      </div>

      <div className="flex flex-col gap-1 py-2">
        <ButtonWithTooltip
          active={activeTheme === 'light'}
          ariaLabel={tCore('user-bar.dark_light_switcher.light')}
          onClick={() => {
            setTheme('light');
          }}
        >
          <Sun />
        </ButtonWithTooltip>

        <ButtonWithTooltip
          active={activeTheme === 'dark'}
          ariaLabel={tCore('user-bar.dark_light_switcher.dark')}
          onClick={() => {
            setTheme('dark');
          }}
        >
          <Moon />
        </ButtonWithTooltip>
      </div>
    </div>
  );
};
