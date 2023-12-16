import { ClearFormattingButtonEditor } from './buttons/clear-formatting-button';
import { SeparatorToolbarEditor } from './separator-toolbar-editor';
import { cx } from '@/functions/classnames';
import { BLOCK_NAMES, useEditor } from './hooks/use-editor';
import { BoldButtonEditor } from './buttons/bold-button';
import { ItalicButtonEditor } from './buttons/italic-button';
import { UnderlineButtonEditor } from './buttons/underline-button';
import { StrikethroughButtonEditor } from './buttons/strikethrough-button';
import { CodeButtonEditor } from './buttons/code-button';
import { FontSizeButtonEditor } from './buttons/font-size-button';
import { ColorButtonEditor } from './buttons/color-button';
import { BlockTypeButtonEditor } from './buttons/block-type-button';
import { UndoMoveButtonEditor } from './buttons/undo-move-button';
import { RedoMoveButtonEditor } from './buttons/redo-move-button';
import { SubscriptButtonEditor } from './buttons/subscript-button';
import { SuperscriptButtonEditor } from './buttons/superscript-button';
import { LinkButtonEditor } from './buttons/link-button';
import { LangCodeBlockButtonEditor } from './buttons/code-block/lang-code-block-button';
import { LanguageButtonEditor } from './buttons/language-button';
import { EmojiButtonEditor } from './buttons/emoji/emoji-button';

interface Props {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  className?: string;
}

export const ToolbarEditor = ({ className, selectedLanguage, setSelectedLanguage }: Props) => {
  const { blockType } = useEditor();

  return (
    <div className={cx('border-b-2 rounded-t-md sticky top-0 bg-background z-10', className)}>
      <div className="flex items-center p-2 overflow-x-auto [&>*]:flex-shrink-0 flex-wrap gap-1">
        <UndoMoveButtonEditor />
        <RedoMoveButtonEditor />
        <SeparatorToolbarEditor />
        <LanguageButtonEditor
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <BlockTypeButtonEditor />

        {blockType !== BLOCK_NAMES.CODE ? (
          <>
            <ClearFormattingButtonEditor />
            <SeparatorToolbarEditor />

            <BoldButtonEditor />
            <ItalicButtonEditor />
            <UnderlineButtonEditor />
            <StrikethroughButtonEditor />
            <CodeButtonEditor />
            <LinkButtonEditor />
            <SeparatorToolbarEditor />

            <SuperscriptButtonEditor />
            <SubscriptButtonEditor />
            <SeparatorToolbarEditor />

            <FontSizeButtonEditor />
            <ColorButtonEditor type="color" />
            <ColorButtonEditor type="background-color" />
            <EmojiButtonEditor />
          </>
        ) : (
          <LangCodeBlockButtonEditor />
        )}
      </div>
    </div>
  );
};
