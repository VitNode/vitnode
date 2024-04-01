import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

import type { TextLanguage } from "@/graphql/hooks";

interface Props {
  value: TextLanguage[];
}

export const LoadReadOnlyEditor = ({ value }: Props): null => {
  const [editor] = useLexicalComposerContext();
  const locale = useLocale();

  const updateEditorState = (value: string): void => {
    try {
      const initialEditorState = editor.parseEditorState(value);
      editor.setEditorState(initialEditorState);
    } catch (e) {
      editor.update((): void => {
        const root = $getRoot();
        root.clear();

        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(value));
        root.append(paragraph);
      });
    }
  };

  // Set the initial editor value
  useEffect((): void => {
    if (value.length === 0) return;

    const currentValue = value.find(
      (item): boolean => item.language_code === locale
    )?.value;
    const lastValue = value.at(-1)?.value;

    if (!currentValue && lastValue) {
      updateEditorState(lastValue);
    } else if (currentValue) {
      updateEditorState(currentValue);
    }
  }, [locale]);

  return null;
};
