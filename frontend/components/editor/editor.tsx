import { useRef, useState } from 'react';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useLocale } from 'next-intl';

import { OnChangePluginEditor } from './plugins/on-change';
import { AutoLinkPluginEditor } from './plugins/auto-link';
import { ToolbarEditor } from './toolbar/toolbar-editor';
import { cx } from '@/functions/classnames';
import { DraggableBlockPluginEditor } from './plugins/draggable-block';
import { MARKDOWN_TRANSFORMERS_EDITOR } from './markdown-transformers-editor';
import { BLOCK_NAMES, EditorContext } from './toolbar/hooks/use-editor';
import { CodeHighlightPluginEditor } from './plugins/code-highlight';
import { CodeActionMenuPluginEditor } from './plugins/code/code-action-menu';
import { useGlobals } from '@/hooks/core/use-globals';
import type { TextLanguage } from '@/graphql/hooks';
import { EmojiPluginEditor } from './plugins/emoji';
import { initialConfigEditor } from './initial-config';
import { BottomToolbarEditor } from './toolbar/bottom-toolbar-editor';

interface Props {
  id: string;
  className?: string;
  enableAutoFocus?: boolean;
  toolbarClassName?: string;
}
interface WithLanguage extends Props {
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
  disableLanguage?: never;
}

interface WithoutLanguage extends Props {
  disableLanguage: true;
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({
  className,
  disableLanguage,
  enableAutoFocus,
  id,
  onChange,
  toolbarClassName,
  value
}: WithLanguage | WithoutLanguage) => {
  const [blockType, setBlockType] = useState<string>(BLOCK_NAMES.PARAGRAPH);
  const floatingAnchorElem = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { defaultLanguage } = useGlobals();
  const [selectedLanguage, setSelectedLanguage] = useState(locale ?? defaultLanguage);

  const initialConfig: InitialConfigType = {
    ...initialConfigEditor,
    namespace: id
  };

  return (
    <EditorContext.Provider value={{ blockType, setBlockType }}>
      <LexicalComposer key={id} initialConfig={initialConfig}>
        <div
          className={cx(
            'relative border border-input rounded-md bg-card ring-offset-background',
            className
          )}
        >
          <ToolbarEditor className={toolbarClassName} />
          {disableLanguage ? (
            <OnChangePluginEditor
              value={value}
              onChange={onChange}
              selectedLanguage={selectedLanguage}
              disableLanguage
            />
          ) : (
            <OnChangePluginEditor
              value={value}
              onChange={onChange}
              selectedLanguage={selectedLanguage}
            />
          )}
          <AutoLinkPluginEditor />
          <CodeHighlightPluginEditor />
          <RichTextPlugin
            contentEditable={
              <div className="relative" ref={floatingAnchorElem}>
                <ContentEditable
                  ariaLabel={id}
                  className="py-4 px-7 border-0 focus:border-0 focus:outline-none min-h-[10rem] resize-y overflow-auto"
                />
              </div>
            }
            placeholder={null}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS_EDITOR} />
          {enableAutoFocus && <AutoFocusPlugin />}
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <TabIndentationPlugin />
          <LinkPlugin />
          <ClearEditorPlugin />
          <EmojiPluginEditor />

          {floatingAnchorElem.current && (
            <>
              <DraggableBlockPluginEditor anchorElem={floatingAnchorElem.current} />
              <CodeActionMenuPluginEditor anchorElem={floatingAnchorElem.current} />
            </>
          )}
          <BottomToolbarEditor
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            disableLanguage={disableLanguage}
          />
        </div>
      </LexicalComposer>
    </EditorContext.Provider>
  );
};
