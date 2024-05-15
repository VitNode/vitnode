import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ThemeEditorTab, useThemeEditor } from "../../hooks/use-theme-editor";

export const ColorTabThemeEditor = () => {
  const { setActiveTab } = useThemeEditor();

  return (
    <div>
      <Button
        className="w-full justify-start"
        variant="ghost"
        onClick={() => setActiveTab(ThemeEditorTab.Main)}
      >
        <ChevronLeft />
        <span>Back</span>
      </Button>

      <div>Color Tab</div>
    </div>
  );
};
