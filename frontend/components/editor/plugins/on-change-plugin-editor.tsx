import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $rootTextContent } from '@lexical/text';
import { $createTextNode, $getRoot, $getSelection, $createParagraphNode } from 'lexical';

interface Props {
  onChange: (editorState: string) => void;
  state: string;
}

export const OnChangePluginEditor = ({ onChange, state }: Props) => {
  const [editor] = useLexicalComposerContext();

  // Update the editor state when the editor state changes
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const text = editorState.read($rootTextContent);

      if (text.length > 0) {
        onChange(JSON.stringify(editorState.toJSON()));

        return;
      }

      onChange('');
    });
  }, [editor, onChange]);

  // Set the initial editor state
  useEffect(() => {
    if (!state) {
      return;
    }

    const initialEditorState = editor.parseEditorState(state);
    editor.setEditorState(initialEditorState);
  }, []);

  return null;
};
