import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';

import { TextLanguage } from '../../../graphql/hooks';

interface Props {
  value: TextLanguage[];
}

export const LoadReadOnlyEditor = ({ value }: Props) => {
  const [editor] = useLexicalComposerContext();
  const locale = useLocale();

  // Set the initial editor value
  useEffect(() => {
    if (value.length > 0) {
      const currentValue = value.find(item => item.id_language === locale)?.value;

      if (!currentValue) {
        const lastValue = value.at(-1)?.value;
        if (!lastValue) return;

        const initialEditorState = editor.parseEditorState(lastValue);
        editor.setEditorState(initialEditorState);

        return;
      }

      const initialEditorState = editor.parseEditorState(currentValue);
      editor.setEditorState(initialEditorState);
    }
  }, [locale]);

  return null;
};
