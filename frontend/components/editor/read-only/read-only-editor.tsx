"use client";

import {
  LexicalComposer,
  type InitialConfigType
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { initialConfigEditor } from "../initial-config";
import type { TextLanguage } from "@/graphql/hooks";
import { LoadReadOnlyEditor } from "./load";

interface Props {
  id: string;
  value: TextLanguage[];
  className?: string;
}

export const ReadOnlyEditor = ({
  className,
  id,
  value
}: Props): JSX.Element => {
  const initialConfig: InitialConfigType = {
    ...initialConfigEditor,
    namespace: id,
    editable: false
  };

  return (
    <LexicalComposer key={id} initialConfig={initialConfig}>
      <LoadReadOnlyEditor value={value} />
      <RichTextPlugin
        contentEditable={
          <ContentEditable ariaLabel={id} className={className} />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};
