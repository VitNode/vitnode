import { Bold } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';

import { ClearFormattingToolbarEditor } from './clear-formatting-toolbar-editor';

import { Toggle } from '../../ui/toggle';

export const ToolbarEditor = () => {
  const [isBold, setIsBold] = useState(false);
  const [editor] = useLexicalComposerContext();

  const onChange = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
    }
  };

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        onChange();

        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          onChange();
        });
      })
    );
  }, [editor]);

  return (
    <div className="border-b-2 rounded-t-md p-2">
      <ClearFormattingToolbarEditor />
      <Toggle
        aria-label="Toggle bold"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        pressed={isBold}
      >
        <Bold />
      </Toggle>
    </div>
  );
};
