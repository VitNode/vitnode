import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';

import { TextLanguage } from '@/graphql/hooks';

interface Props {
  value: TextLanguage[];
}

export const LoadReadOnlyEditor = ({ value }: Props) => {
  const [editor] = useLexicalComposerContext();
  const locale = useLocale();

  const updateEditorState = (value: string) => {
    try {
      const initialEditorState = editor.parseEditorState(value);
      editor.setEditorState(initialEditorState);
    } catch (e) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();

        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(value));
        root.append(paragraph);
      });
    }
  };

  // Set the initial editor value
  useEffect(() => {
    if (value.length === 0) return;

    const currentValue = value.find(item => item.id_language === locale)?.value;
    const lastValue = value.at(-1)?.value;

    if (!currentValue && lastValue) {
      updateEditorState(lastValue);
    } else if (currentValue) {
      updateEditorState(currentValue);
    }
  }, [locale]);

  return null;
};
