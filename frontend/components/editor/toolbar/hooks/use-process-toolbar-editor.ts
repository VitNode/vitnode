// import { createContext, useContext } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { Dispatch, SetStateAction } from 'react';

interface Args {
  setIsBold: Dispatch<SetStateAction<boolean>>;
  setIsItalic: Dispatch<SetStateAction<boolean>>;
  setIsUnderline: Dispatch<SetStateAction<boolean>>;
}

export const useProcessToolbarEditor = ({ setIsBold, setIsItalic, setIsUnderline }: Args) => {
  const [editor] = useLexicalComposerContext();

  const handleChange = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  };

  return {
    editor,
    handleChange
  };
};
