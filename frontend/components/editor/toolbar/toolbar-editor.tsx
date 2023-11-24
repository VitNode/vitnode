import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';

import { ClearFormattingToolbarEditor } from './clear-formatting-toolbar-editor';
import { useProcessToolbarEditor } from './hooks/use-process-toolbar-editor';
import { SeparatorToolbarEditor } from './separator-toolbar-editor';
import { TextGroupsToolbarEditor } from './groups/text/text-groups-toolbar-editor';
import { ToolbarEditorContext } from './hooks/use-toolbar-editor';

export const ToolbarEditor = () => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const { editor, handleChange } = useProcessToolbarEditor({
    setIsBold,
    setIsItalic,
    setIsUnderline
  });

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
      <div className="border-b-2 rounded-t-md p-2 flex items-center">
        <ClearFormattingToolbarEditor />

        <SeparatorToolbarEditor />

        <TextGroupsToolbarEditor />
      </div>
    </ToolbarEditorContext.Provider>
  );
};
