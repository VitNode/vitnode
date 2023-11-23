import { useState } from 'react';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { Italic } from 'lucide-react';
import { CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

import { Toggle } from '../ui/toggle';
import { OnChangePluginEditor } from './plugins/on-change-plugin-editor';
import { AutoLinkPluginEditor } from './plugins/auto-link-plugin-editor';

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
    },
    nodes: [
      HorizontalRuleNode,
      CodeNode,
      HeadingNode,
      LinkNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      AutoLinkNode
    ]
  };

  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="border border-input rounded-md bg-background ring-offset-background [&:has(div:focus)]:ring-2 [&:has(div:focus)]:ring-ring [&:has(div:focus)]:ring-offset-2">
          <div className="border-b-2 rounded-t-md p-2">
            <Toggle aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
          </div>
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="p-3 text-sm border-0 focus:border-0 focus:outline-none min-h-[10rem] resize-y overflow-auto" />
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePluginEditor state={editorState} onChange={setEditorState} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <AutoLinkPluginEditor />
          <HistoryPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
};
