import { createContext, useContext } from "react";
import type { HslColor } from "react-colorful";
import type { UseFormReturn } from "react-hook-form";

export enum ThemeEditorTab {
  Main = "main",
  Colors = "colors"
}

interface ThemeEditorFormObj {
  color_primary: {
    dark: HslColor;
    light: HslColor;
  };
}

interface Args {
  activeTab: ThemeEditorTab;
  activeTheme: "light" | "dark";
  changeColor: ({ color, name }: { color: string; name: string }) => void;
  direction: number;
  form: UseFormReturn<ThemeEditorFormObj>;
  onSubmit: (values: ThemeEditorFormObj) => void;
  setActiveTab: (tab: ThemeEditorTab) => void;
}

export const ThemeEditorContext = createContext<Args>({
  activeTab: ThemeEditorTab.Main,
  setActiveTab: () => {},
  direction: -1,
  form: {} as UseFormReturn<ThemeEditorFormObj>,
  onSubmit: () => {},
  changeColor: () => {},
  activeTheme: "light"
});

export const useThemeEditor = () => useContext(ThemeEditorContext);
