'use client';

import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import { Core_Theme_Editor__ShowQuery } from '@/graphql/queries/admin/theme_editor/core_theme_editor__show.generated';
import { cn } from '@/helpers/classnames';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';
import { Undo2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ThemeEditorContext, ThemeEditorTab } from './hooks/use-theme-editor';
import {
  keysFromCSSThemeEditor,
  useThemeEditorApi,
} from './hooks/use-theme-editor-api';
import { SidebarThemeEditor } from './sidebar/sidebar';
import { ThemeEditorViewEnum, ToolbarThemeEditor } from './toolbar';

export const ContentThemeEditor = (props: Core_Theme_Editor__ShowQuery) => {
  const t = useTranslations('admin.global');
  const tCore = useTranslations('core.global');
  const { activeTheme, iframeRef, ...rest } = useThemeEditorApi(props);
  const [activeMode, setActiveMode] = React.useState<ThemeEditorViewEnum>(
    ThemeEditorViewEnum.Desktop,
  );
  const [activeTab, setActiveTab] = React.useState<ThemeEditorTab>(
    ThemeEditorTab.Main,
  );
  const [mounted, setMounted] = React.useState(false);
  const direction: number = activeTab === ThemeEditorTab.Main ? -1 : 1;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader className="p-6" />;
  }

  return (
    <ThemeEditorContext.Provider
      value={{
        activeTab,
        setActiveTab,
        direction,
        activeTheme,
        iframeRef,
        ...rest,
      }}
    >
      <div className="bg-background fixed left-0 top-0 z-40 m-auto h-full w-full p-6 sm:hidden">
        <Card className="space-y-4 p-5 text-center sm:hidden">
          <div>{t('mobile_not_supported')}</div>
          <Link
            aria-label={tCore('go_back')}
            className={buttonVariants({})}
            href="/admin/core/dashboard"
          >
            <Undo2 />
            {tCore('go_back')}
          </Link>
        </Card>
      </div>

      <div className="bg-card flex h-dvh w-full">
        <div className="bg-card fixed left-0 top-0 z-30 flex h-dvh">
          <ToolbarThemeEditor
            activeMode={activeMode}
            setActiveMode={setActiveMode}
          />
          <SidebarThemeEditor />
        </div>

        <div className="ml-[313px] flex flex-1 items-center justify-center">
          <iframe
            className={cn('bg-background transition-all', {
              'h-full w-full': activeMode === ThemeEditorViewEnum.Desktop,
              'h-5/6 w-[768px] rounded-md border':
                activeMode === ThemeEditorViewEnum.Tablet,
              'h-5/6 w-[375px] rounded-md border':
                activeMode === ThemeEditorViewEnum.Mobile,
            })}
            onLoad={() => {
              const colors = rest.form.getValues().colors;
              if (CONFIG.node_development || !colors) {
                return;
              }

              const iframe =
                iframeRef.current?.contentWindow?.document.querySelector(
                  'html',
                );
              if (!iframe) return;

              keysFromCSSThemeEditor.forEach(key => {
                const color = colors[key][activeTheme];
                iframe.style.setProperty(
                  `--${key}`,
                  `${color.h} ${color.s}% ${color.l}%`,
                );
              });
            }}
            ref={iframeRef}
            src={CONFIG.frontend_url}
            title={CONFIG.frontend_url}
          />
        </div>
      </div>
    </ThemeEditorContext.Provider>
  );
};
