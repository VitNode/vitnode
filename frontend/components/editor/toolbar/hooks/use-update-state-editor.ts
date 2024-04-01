import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from "lexical";
import { useEffect } from "react";

interface Args {
  handleChange: () => void;
}

export const useUpdateStateEditor = ({ handleChange }: Args): void => {
  const [editor] = useLexicalComposerContext();

  useEffect((): (() => void) => {
    editor.update(handleChange);

    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (): boolean => {
          handleChange();

          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerUpdateListener(({ editorState }): void => {
        editorState.read((): void => {
          handleChange();
        });
      })
    );
  }, [editor]);
};
