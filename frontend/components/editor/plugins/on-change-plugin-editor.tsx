import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useState } from 'react';
import { $rootTextContent } from '@lexical/text';
import { CLEAR_EDITOR_COMMAND } from 'lexical';

import { TextLanguage } from '@/graphql/hooks';

interface Props {
  onChange: (value: TextLanguage[]) => void;
  selectedLanguage: string;
  value: TextLanguage[];
}

export const OnChangePluginEditor = ({ onChange, selectedLanguage, value }: Props) => {
  const [firstRender, setFirstRender] = useState(true);
  const [editor] = useLexicalComposerContext();

  // Set the initial editor value
  useEffect(() => {
    if (value) {
      const currentValue = value.find(item => item.id_language === selectedLanguage)?.value;
      if (!currentValue) {
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);

        return;
      }

      const initialEditorState = editor.parseEditorState(currentValue);
      editor.setEditorState(initialEditorState);
    }

    if (firstRender) {
      setFirstRender(false);
    }
  }, [selectedLanguage]);

  // Update the editor value when the editor value changes
  useEffect(() => {
    if (firstRender) return;

    return editor.registerUpdateListener(({ editorState }) => {
      const text = editorState.read($rootTextContent);
      const valueAsArray = Array.isArray(value) ? value : [];

      onChange([
        ...valueAsArray.filter(item => item.id_language !== selectedLanguage),
        {
          id_language: selectedLanguage,
          value: text.length > 0 ? JSON.stringify(editorState.toJSON()) : ''
        }
      ]);

      // console.log('OnChangePluginEditor', JSON.stringify(editorState.toJSON()));
    });
  }, [editor, onChange, firstRender, selectedLanguage]);

  return null;
};
