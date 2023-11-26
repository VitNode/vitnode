import { useState } from 'react';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import { OnChangePluginEditor } from './plugins/on-change-plugin-editor';
import { AutoLinkPluginEditor } from './plugins/auto-link-plugin-editor';
import { ToolbarEditor } from './toolbar/toolbar-editor';
import { themeEditor } from './theme-editor';
import { cx } from '@/functions/classnames';

interface Props {
  id: string;
  className?: string;
  toolbarClassName?: string;
}

export const Editor = ({ className, id, toolbarClassName }: Props) => {
  const [editorState, setEditorState] = useState('');

  const initialConfig: InitialConfigType = {
    namespace: id,
    theme: themeEditor,
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
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cx(
          'relative border border-input rounded-md bg-card ring-offset-background',
          className
        )}
      >
        <AutoFocusPlugin />
        <ToolbarEditor className={toolbarClassName} />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-3 border-0 focus:border-0 focus:outline-none min-h-[10rem] resize-y overflow-auto" />
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
  );
};
