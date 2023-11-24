import { createContext, useContext } from 'react';

export const ToolbarEditorContext = createContext({
  isBold: false,
  isItalic: false,
  isUnderline: false
});

export const useToolbarEditor = () => useContext(ToolbarEditorContext);
