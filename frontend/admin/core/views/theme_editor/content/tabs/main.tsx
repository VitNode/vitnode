import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ThemeEditorTab, useThemeEditor } from "../../hooks/use-theme-editor";

export const MainTabThemeEditor = () => {
  const { setActiveTab } = useThemeEditor();

  return (
    <div>
      <Button
        className="w-full justify-start"
        variant="ghost"
        onClick={() => setActiveTab(ThemeEditorTab.Colors)}
      >
        <span>Colors</span>
        <ChevronRight className="ml-auto text-muted-foreground" />
      </Button>
    </div>
  );
};
