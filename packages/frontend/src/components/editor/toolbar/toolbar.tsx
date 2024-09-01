import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
  Underline,
} from 'lucide-react';

import { cn } from '../../../helpers/classnames';
import { useGlobals } from '../../../hooks/use-globals';
import { useEditorState } from '../hooks/use-editor-state';
import { ButtonToolbarEditor } from './button';
import { ColorToolbarEditor } from './custom/color/color';
import { EmojiToolbarEditor } from './custom/emoji/emoji';
import { HeadingToolbarEditor } from './custom/heading';
import { LinkToolbarEditor } from './custom/link/link';
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

      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        pressed={editor.isActive('strike')}
      >
        <Strikethrough />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        pressed={editor.isActive('bulletList')}
      >
        <List />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        pressed={editor.isActive('orderedList')}
      >
        <ListOrdered />
      </ToggleToolbarEditor>

      <HeadingToolbarEditor />
      <ColorToolbarEditor />
      <TextAlignToolbarEditor />
      <LinkToolbarEditor />
      <EmojiToolbarEditor />

      <ButtonToolbarEditor
        name="horizontal_rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </ButtonToolbarEditor>

      <ToggleToolbarEditor
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        pressed={editor.isActive('blockquote')}
      >
        <Quote />
      </ToggleToolbarEditor>
    </div>
  );
};
