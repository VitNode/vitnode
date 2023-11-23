import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { useState } from 'react';

import { OnChangePluginEditor } from './plugins/on-change-plugin-editor';

interface Props {
  id: string;
}

export const Editor = ({ id }: Props) => {
  const [editorState, setEditorState] = useState('');

  const initialConfig: InitialConfigType = {
    namespace: id,
    theme: {},
    onError: error => {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="border border-input rounded-md bg-background ring-offset-background [&:has(div:focus)]:ring-2 [&:has(div:focus)]:ring-ring [&:has(div:focus)]:ring-offset-2">
          <PlainTextPlugin
            contentEditable={
              <ContentEditable className="p-3 text-sm border-0 focus:border-0 focus:outline-none min-h-[10rem] resize-y overflow-auto" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePluginEditor state={editorState} onChange={setEditorState} />
          <HistoryPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
};
