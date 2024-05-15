import { createContext, useContext } from "react";

export enum ThemeEditorTab {
  Main = "main",
  Colors = "colors"
}

interface Args {
  activeTab: ThemeEditorTab;
  direction: number;
  setActiveTab: (tab: ThemeEditorTab) => void;
}

export const ThemeEditorContext = createContext<Args>({
  activeTab: ThemeEditorTab.Main,
  setActiveTab: () => {},
  direction: -1
});

export const useThemeEditor = () => useContext(ThemeEditorContext);
