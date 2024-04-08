import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo
} from "lucide-react";

import { ToggleToolbarEditor } from "./toggle";
import { SeparatorToolbarEditor } from "./separator";
import { ButtonToolbarEditor } from "./button";
import { LinkToolbarEditor } from "./custom/link/link";
import { HeadingToolbarEditor } from "./custom/heading";

interface Props {
  editor: Editor;
}

export const ToolBarEditor = ({ editor }: Props) => {
  return (
    <div className="bg-background p-1 rounded-t-md flex gap-1 items-center">
      <ButtonToolbarEditor
        name="undo"
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo />
      </ButtonToolbarEditor>

      <ButtonToolbarEditor
        name="redo"
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo />
      </ButtonToolbarEditor>

      <SeparatorToolbarEditor />

      <HeadingToolbarEditor editor={editor} />

      <ToggleToolbarEditor
        pressed={editor.isActive("bold")}
        name="bold"
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("italic")}
        name="italic"
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("underline")}
        name="underline"
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("strike")}
        name="strike"
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </ToggleToolbarEditor>

      <SeparatorToolbarEditor />

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "left" })}
        name="text_align_left"
        onPressedChange={() => {
          editor.commands.setTextAlign("left");
          editor.commands.focus();
        }}
      >
        <AlignLeft />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "center" })}
        name="text_align_center"
        onPressedChange={() => {
          editor.commands.setTextAlign("center");
          editor.commands.focus();
        }}
      >
        <AlignCenter />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "right" })}
        name="text_align_right"
        onPressedChange={() => {
          editor.commands.setTextAlign("right");
          editor.commands.focus();
        }}
      >
        <AlignRight />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "justify" })}
        name="text_align_justify"
        onPressedChange={() => {
          editor.commands.setTextAlign("justify");
          editor.commands.focus();
        }}
      >
        <AlignJustify />
      </ToggleToolbarEditor>

      <SeparatorToolbarEditor />

      <ToggleToolbarEditor
        pressed={editor.isActive("bulletList")}
        name="bullet_list"
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("orderedList")}
        name="ordered_list"
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </ToggleToolbarEditor>

      <SeparatorToolbarEditor />

      <LinkToolbarEditor editor={editor} />

      <ToggleToolbarEditor
        pressed={editor.isActive("blockquote")}
        name="block_quote"
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote />
      </ToggleToolbarEditor>

      <ButtonToolbarEditor
        name="horizontal_rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </ButtonToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("codeBlock")}
        name="code_block"
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code />
      </ToggleToolbarEditor>
    </div>
  );
};
