import { Bold, Italic, Underline } from 'lucide-react';

import { cn } from '../../helpers/classnames';
import { useGlobals } from '../../hooks/use-globals';
import { useEditorState } from '../hooks/use-editor-state';
import { ColorToolbarEditor } from './custom/color/color';
import { EmojiToolbarEditor } from './custom/emoji/emoji';
import { HeadingToolbarEditor } from './custom/heading';
import { LinkToolbarEditor } from './custom/link/link';
import { MoreToolbarEditor } from './custom/more';
import { PlusToolbarEditor } from './custom/plus';
import { TextAlignToolbarEditor } from './custom/text-align';
import { ToggleToolbarEditor } from './toggle';

export const ToolBarEditor = () => {
  const { config } = useGlobals();
  const { editor } = useEditorState();

  return (
    <div
      className={cn(
        'bg-background flex flex-wrap items-center gap-1 rounded-t-sm border-b p-1',
        {
          'sticky top-[4rem] z-10 max-h-[26vh] overflow-auto':
            config.editor.sticky,
        },
      )}
    >
      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        pressed={editor.isActive('bold')}
      >
        <Bold />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        pressed={editor.isActive('italic')}
      >
        <Italic />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        pressed={editor.isActive('underline')}
      >
        <Underline />
      </ToggleToolbarEditor>

      <HeadingToolbarEditor />
      <PlusToolbarEditor />
      <ColorToolbarEditor />
      <TextAlignToolbarEditor />
      <LinkToolbarEditor />
      <EmojiToolbarEditor />
      <MoreToolbarEditor />
    </div>
  );
};
