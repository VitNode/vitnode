"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { CONFIG } from "@/config";
import { cn } from "@/functions/classnames";
import { ThemeEditorViewEnum, ToolbarThemeEditor } from "./toolbar";
import { ThemeEditorContext, ThemeEditorTab } from "./hooks/use-theme-editor";
import { ContentThemeEditor } from "./content/content";
import { useThemeEditorApi } from "./hooks/use-theme-editor-api";
import { Loader } from "@/components/loader";

export const ThemeEditorView = () => {
  const { changeColor, form, iframeRef, onSubmit } = useThemeEditorApi();
  const [activeMode, setActiveMode] = useState<ThemeEditorViewEnum>(
    ThemeEditorViewEnum.Desktop
  );
  const [activeTab, setActiveTab] = useState<ThemeEditorTab>(
    ThemeEditorTab.Main
  );
  const [mounted, setMounted] = useState(false);
  const direction: number = activeTab === ThemeEditorTab.Main ? -1 : 1;
  const { resolvedTheme, theme } = useTheme();
  const activeTheme: "light" | "dark" =
    (resolvedTheme ?? theme) === "dark" ? "dark" : "light";

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
        form,
        onSubmit,
        changeColor,
        activeTheme
      }}
    >
      <div className="flex h-screen bg-card w-full">
        <div className="flex-1 flex items-center justify-center">
          <iframe
            ref={iframeRef}
            title={CONFIG.frontend_url}
            className={cn("border bg-background transition-all", {
              "w-full h-full": activeMode === "desktop",
              "w-[768px] h-5/6 rounded-md": activeMode === "tablet",
              "w-[375px] h-5/6 rounded-md": activeMode === "mobile"
            })}
            src={CONFIG.frontend_url}
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
