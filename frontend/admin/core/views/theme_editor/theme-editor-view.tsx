"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { CONFIG } from "@/config";
import { cn } from "@/functions/classnames";
import { ThemeEditorViewEnum, ToolbarThemeEditor } from "./toolbar";
import { ThemeEditorContext, ThemeEditorTab } from "./hooks/use-theme-editor";
import { ContentThemeEditor } from "./content/content";

export const ThemeEditorView = () => {
  const t = useTranslations("core");
  const [activeMode, setActiveMode] = useState<ThemeEditorViewEnum>(
    ThemeEditorViewEnum.Desktop
  );
  const [activeTab, setActiveTab] = useState<ThemeEditorTab>(
    ThemeEditorTab.Main
  );
  const direction: number = activeTab === ThemeEditorTab.Main ? -1 : 1;

  return (
    <ThemeEditorContext.Provider value={{ activeTab, setActiveTab, direction }}>
      <div className="flex-1 flex items-center justify-center">
        <iframe
          title={CONFIG.frontend_url}
          className={cn("border bg-background transition-all", {
            "w-full h-full": activeMode === "desktop",
            "w-[768px] h-5/6 rounded-md": activeMode === "tablet",
            "w-[375px] h-5/6 rounded-md": activeMode === "mobile"
          })}
          src={CONFIG.frontend_url}
        />
      </div>

      <div className="w-96 flex-shrink-0 shadow-lg border-l flex">
        <ToolbarThemeEditor setActiveMode={setActiveMode} />

        <div className="flex-1 overflow-auto relative flex flex-col">
          <h1 className="font-semibold text-lg px-6 py-4">
            {t("theme_editor.title")}
          </h1>
          <ContentThemeEditor />
        </div>
      </div>
    </ThemeEditorContext.Provider>
  );
};
