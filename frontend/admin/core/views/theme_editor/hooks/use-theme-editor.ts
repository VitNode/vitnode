import { createContext, useContext } from "react";
import type { HslColor } from "react-colorful";
import type { UseFormReturn } from "react-hook-form";

import type { formSchemaColorsThemeEditor } from "./use-theme-editor-api";

export enum ThemeEditorTab {
  Main = "main",
  Colors = "colors"
}

interface ColorObj {
  dark: HslColor;
  light: HslColor;
}

interface ThemeEditorFormObj {
  colors: {
    background: ColorObj;
    primary: ColorObj;
    "primary-foreground": ColorObj;
    secondary: ColorObj;
  };
}

interface Args {
  activeTab: ThemeEditorTab;
  activeTheme: "light" | "dark";
  changeColor: ({
    hslColor,
    name
  }: {
    hslColor: HslColor;
    name: keyof typeof formSchemaColorsThemeEditor.shape;
  }) => void;
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
