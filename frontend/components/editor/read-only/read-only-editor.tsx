import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { initialConfigEditor } from '../initial-config';
import { TextLanguage } from '@/graphql/hooks';
import { LoadReadOnlyEditor } from './load';
import '../editor.scss';

interface Props {
  id: string;
  value: TextLanguage[];
}

export const ReadOnlyEditor = ({ id, value }: Props) => {
  if (value.length <= 0) return null;

  const initialConfig: InitialConfigType = {
    ...initialConfigEditor,
    namespace: id,
    editable: false
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LoadReadOnlyEditor value={value} />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};
