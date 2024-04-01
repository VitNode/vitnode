import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $rootTextContent } from "@lexical/text";
import { CLEAR_EDITOR_COMMAND } from "lexical";

import type { TextLanguage } from "@/graphql/hooks";

interface Props {
  selectedLanguage: string;
}

interface WithLanguage extends Props {
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
  disableLanguage?: never;
}

interface WithoutLanguage extends Props {
  disableLanguage: true;
  onChange: (value: string) => void;
  value: string;
}

export const OnChangePluginEditor = ({
  disableLanguage,
  onChange,
  selectedLanguage,
  value
}: WithLanguage | WithoutLanguage): null => {
  const [editor] = useLexicalComposerContext();

  // Set the initial editor value
  useEffect((): void => {
    if (!value || value.length === 0) return;

    if (disableLanguage && typeof value === "string") {
      const initialEditorState = editor.parseEditorState(value);
      editor.setEditorState(initialEditorState);

      return;
    }

    // If the value is not an array, we don't know what to do with it
    if (!Array.isArray(value)) return;

    const currentValue = value.find(
      (item): boolean => item.language_code === selectedLanguage
    )?.value;
    if (!currentValue) {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);

      return;
    }

    const initialEditorState = editor.parseEditorState(currentValue);
    editor.setEditorState(initialEditorState);
  }, [selectedLanguage]);

  // Update the editor value when the editor value changes
  useEffect((): (() => void) => {
    return editor.registerUpdateListener(({ editorState }): void => {
      const text = editorState.read($rootTextContent).trimStart();
      const valueAsArray = Array.isArray(value) ? value : [];

      if (disableLanguage || typeof value === "string") {
        onChange(text as TextLanguage[] & string);

        return;
      }

      if (text.length === 0) {
        onChange(
          valueAsArray.filter(
            (item): boolean => item.language_code !== selectedLanguage
          )
        );

        return;
      }

      onChange([
        ...valueAsArray.filter(
          (item): boolean => item.language_code !== selectedLanguage
        ),
        {
          language_code: selectedLanguage,
          value: JSON.stringify(editorState.toJSON())
        }
      ]);
    });
  }, [editor, onChange, selectedLanguage]);

  return null;
};
