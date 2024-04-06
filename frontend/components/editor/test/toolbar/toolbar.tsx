import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  QuoteIcon,
  ListBulletIcon
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";

import { ToggleToolbarEditor } from "./toggle";
import { SeparatorToolbarEditor } from "./separator";

interface Props {
  editor: Editor;
}

export const ToolBarEditor = ({ editor }: Props) => {
  return (
    <div className="bg-background p-1 rounded-t-md flex gap-1 items-center">
      <ToggleToolbarEditor
        pressed={editor.isActive("bold")}
        name="bold"
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <FontBoldIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("italic")}
        name="italic"
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <FontItalicIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("underline")}
        name="underline"
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("strike")}
        name="strike"
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon />
      </ToggleToolbarEditor>

      <SeparatorToolbarEditor />

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "left" })}
        name="text_align_left"
        onPressedChange={() => editor.commands.setTextAlign("left")}
      >
        <TextAlignLeftIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "center" })}
        name="text_align_center"
        onPressedChange={() => editor.commands.setTextAlign("center")}
      >
        <TextAlignCenterIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "right" })}
        name="text_align_right"
        onPressedChange={() => editor.commands.setTextAlign("right")}
      >
        <TextAlignRightIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive({ textAlign: "justify" })}
        name="text_align_justify"
        onPressedChange={() => editor.commands.setTextAlign("justify")}
      >
        <TextAlignJustifyIcon />
      </ToggleToolbarEditor>

      <SeparatorToolbarEditor />

      <ToggleToolbarEditor
        pressed={editor.isActive("blockquote")}
        name="block_quote"
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <QuoteIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("bulletList")}
        name="bullet_list"
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <ListBulletIcon />
      </ToggleToolbarEditor>
    </div>
  );
};
