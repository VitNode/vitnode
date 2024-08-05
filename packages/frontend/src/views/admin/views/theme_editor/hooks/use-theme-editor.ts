import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { formSchemaColorsThemeEditor } from './use-theme-editor-api';
import { HslColor } from '@/graphql/types';
import { FilesInputValue } from '@/components/ui/file-input';

export enum ThemeEditorTab {
  Main = 'main',
  Colors = 'colors',
  Logos = 'logos',
}

interface ColorObj {
  dark: HslColor;
  light: HslColor;
}

interface ThemeEditorFormObj {
  logos: {
    dark: FilesInputValue | null;
    light: FilesInputValue | null;
    mobile_dark: FilesInputValue | null;
    mobile_light: FilesInputValue | null;
    mobile_width: number;
    text: string;
    width: number;
  };
  colors?: {
    accent: ColorObj;
    'accent-foreground': ColorObj;
    background: ColorObj;
    border: ColorObj;
    card: ColorObj;
    cover: ColorObj;
    'cover-foreground': ColorObj;
    destructive: ColorObj;
    'destructive-foreground': ColorObj;
    muted: ColorObj;
    'muted-foreground': ColorObj;
    primary: ColorObj;
    'primary-foreground': ColorObj;
    secondary: ColorObj;
    'secondary-foreground': ColorObj;
  };
}

interface Args {
  activeTab: ThemeEditorTab;
  activeTheme: 'dark' | 'light';
  changeColor: ({
    hslColor,
    name,
  }: {
    hslColor: HslColor;
    name: keyof typeof formSchemaColorsThemeEditor.shape;
  }) => void;
  direction: number;
  form: UseFormReturn<ThemeEditorFormObj>;
  iframeRef: React.RefObject<HTMLIFrameElement> | null;
  onSubmit: (values: ThemeEditorFormObj) => void;
  openSubmitDialog: boolean;
  setActiveTab: (tab: ThemeEditorTab) => void;
  setOpenSubmitDialog: (open: boolean) => void;
}

export const ThemeEditorContext = React.createContext<Args>({
  activeTab: ThemeEditorTab.Main,
  setActiveTab: () => {},
  direction: -1,
  form: {} as UseFormReturn<ThemeEditorFormObj>,
  onSubmit: () => {},
  changeColor: () => {},
  activeTheme: 'light',
  openSubmitDialog: false,
  setOpenSubmitDialog: () => {},
  iframeRef: null,
});

export const useThemeEditor = () => React.useContext(ThemeEditorContext);
