'use client';

import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { initialConfigEditor } from '../initial-config';
import type { TextLanguage } from '@/graphql/hooks';
import { LoadReadOnlyEditor } from './load';
import '../editor.scss';

interface Props {
  id: string;
  value: TextLanguage[];
  className?: string;
}

export const ReadOnlyEditor = ({ className, id, value }: Props) => {
  const initialConfig: InitialConfigType = {
    ...initialConfigEditor,
    namespace: id,
    editable: false
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LoadReadOnlyEditor value={value} />
      <RichTextPlugin
        contentEditable={<ContentEditable className={className} />}
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};
