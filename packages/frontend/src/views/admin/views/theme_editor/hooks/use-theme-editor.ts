import { FilesInputValue } from '@/components/ui/file-input';
import { HslColor } from '@/graphql/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { formSchemaColorsThemeEditor } from './use-theme-editor-api';

export enum ThemeEditorTab {
  Colors = 'colors',
  Logos = 'logos',
  Main = 'main',
}

interface ColorObj {
  dark: HslColor;
  light: HslColor;
}

interface ThemeEditorFormObj {
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
  logos: {
    dark: FilesInputValue[];
    light: FilesInputValue[];
    mobile_dark: FilesInputValue[];
    mobile_light: FilesInputValue[];
    mobile_width: number;
    text: string;
    width: number;
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
  iframeRef: null | React.RefObject<HTMLIFrameElement>;
  onSubmit: (values: ThemeEditorFormObj) => void;
  setActiveTab: (tab: ThemeEditorTab) => void;
}

export const ThemeEditorContext = React.createContext<Args>({
  activeTab: ThemeEditorTab.Main,
  setActiveTab: () => {},
  direction: -1,
  form: {} as UseFormReturn<ThemeEditorFormObj>,
  onSubmit: () => {},
  changeColor: () => {},
  activeTheme: 'light',
  iframeRef: null,
});

export const useThemeEditor = () => React.useContext(ThemeEditorContext);
