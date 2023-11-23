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
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className="relative flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePluginEditor state={editorState} onChange={setEditorState} />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
};
