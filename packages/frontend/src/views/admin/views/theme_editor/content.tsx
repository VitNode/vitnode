'use client';

import * as React from 'react';

import { ThemeEditorViewEnum, ToolbarThemeEditor } from './toolbar';
import { ThemeEditorContext, ThemeEditorTab } from './hooks/use-theme-editor';
import { SidebarThemeEditor } from './sidebar/sidebar';
import {
  keysFromCSSThemeEditor,
  useThemeEditorApi,
} from './hooks/use-theme-editor-api';

import { Core_Theme_Editor__ShowQuery } from '../../../../graphql/graphql';
import { CONFIG } from '../../../../helpers/config-with-env';
import { cn } from '../../../../helpers/classnames';
import { Loader } from '../../../../components/ui/loader';

export const ContentThemeEditor = (props: Core_Theme_Editor__ShowQuery) => {
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
        ...rest,
      }}
    >
      <div className="bg-card flex h-screen w-full">
        <div className="flex flex-1 items-center justify-center">
          <iframe
            ref={iframeRef}
            title={CONFIG.frontend_url}
            className={cn('bg-background transition-all', {
              'h-full w-full': activeMode === 'desktop',
              'h-5/6 w-[768px] rounded-md border': activeMode === 'tablet',
              'h-5/6 w-[375px] rounded-md border': activeMode === 'mobile',
            })}
            src={CONFIG.frontend_url}
            onLoad={() => {
              if (CONFIG.node_development) return;

              const iframe =
                iframeRef.current?.contentWindow?.document.querySelector(
                  'html',
                );
              if (!iframe) return;

              keysFromCSSThemeEditor.forEach(key => {
                const color = rest.form.getValues().colors[key][activeTheme];
                iframe.style.setProperty(
                  `--${key}`,
                  `${color.h} ${color.s}% ${color.l}%`,
                );
              });
            }}
          />
        </div>

        <div className="flex w-80 shrink-0 overflow-auto border-l shadow-lg">
          <ToolbarThemeEditor
            setActiveMode={setActiveMode}
            activeMode={activeMode}
          />
          <SidebarThemeEditor />
        </div>
      </div>
    </ThemeEditorContext.Provider>
  );
};
