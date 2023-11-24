import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND
} from 'lexical';
import { useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { ClearFormattingToolbarEditor } from './clear-formatting-toolbar-editor';
import { SeparatorToolbarEditor } from './separator-toolbar-editor';
import { TextGroupsToolbarEditor } from './groups/text/text-groups-toolbar-editor';
import { ToolbarEditorContext } from './hooks/use-toolbar-editor';
import { cx } from '@/functions/classnames';

interface Props {
  className?: string;
}

export const ToolbarEditor = ({ className }: Props) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
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

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        handleChange();

        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          handleChange();
        });
      })
    );
  }, [editor]);

  return (
    <ToolbarEditorContext.Provider value={{ isBold, isItalic, isUnderline }}>
      <div
        className={cx(
          'border-b-2 rounded-t-md p-2 flex items-center sticky top-16 bg-background',
          className
        )}
      >
        <ClearFormattingToolbarEditor />

        <SeparatorToolbarEditor />

        <TextGroupsToolbarEditor />
      </div>
    </ToolbarEditorContext.Provider>
  );
};
