"use client";

import { useEffect, useState } from "react";

import { CONFIG } from "@/config";
import { cn } from "@/functions/classnames";
import { ThemeEditorViewEnum, ToolbarThemeEditor } from "./toolbar";
import { ThemeEditorContext, ThemeEditorTab } from "./hooks/use-theme-editor";
import { ContentThemeEditor } from "./content/content";
import {
  keysFromCSSThemeEditor,
  useThemeEditorApi
} from "./hooks/use-theme-editor-api";
import { Loader } from "@/components/loader";
import { Core_Theme_Editor__ShowQuery } from "@/graphql/hooks";

export const ThemeEditorView = (props: Core_Theme_Editor__ShowQuery) => {
  const { activeTheme, iframeRef, ...rest } = useThemeEditorApi(props);
  const [activeMode, setActiveMode] = useState<ThemeEditorViewEnum>(
    ThemeEditorViewEnum.Desktop
  );
  const [activeTab, setActiveTab] = useState<ThemeEditorTab>(
    ThemeEditorTab.Main
  );
  const [mounted, setMounted] = useState(false);
  const direction: number = activeTab === ThemeEditorTab.Main ? -1 : 1;

  useEffect(() => {
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
        ...rest
      }}
    >
      <div className="flex h-screen bg-card w-full">
        <div className="flex-1 flex items-center justify-center">
          <iframe
            ref={iframeRef}
            title={CONFIG.frontend_url}
            className={cn("bg-background transition-all", {
              "w-full h-full": activeMode === "desktop",
              "w-[768px] h-5/6 rounded-md border": activeMode === "tablet",
              "w-[375px] h-5/6 rounded-md border": activeMode === "mobile"
            })}
            src={CONFIG.frontend_url}
            onLoad={() => {
              if (CONFIG.node_development) return;

              const iframe =
                iframeRef.current?.contentWindow?.document.querySelector(
                  "html"
                );
              if (!iframe) return;

              keysFromCSSThemeEditor.forEach(key => {
                const color = rest.form.getValues().colors[key][activeTheme];
                iframe.style.setProperty(
                  `--${key}`,
                  `${color.h} ${color.s}% ${color.l}%`
                );
              });
            }}
          />
        </div>

        <div className="w-80 flex-shrink-0 shadow-lg border-l flex overflow-auto">
          <ToolbarThemeEditor
            setActiveMode={setActiveMode}
            activeMode={activeMode}
          />
          <ContentThemeEditor />
        </div>
      </div>
    </ThemeEditorContext.Provider>
  );
};
