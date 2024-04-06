import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";

import { ToggleToolbarEditor } from "./toggle";

interface Props {
  editor: Editor;
}

export const ToolBarEditor = ({ editor }: Props) => {
  return (
    <div className="bg-background p-1 rounded-t-md flex gap-1">
      <ToggleToolbarEditor
        editor={editor}
        name="bold"
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <FontBoldIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        editor={editor}
        name="italic"
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <FontItalicIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        editor={editor}
        name="underline"
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        editor={editor}
        name="strike"
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon />
      </ToggleToolbarEditor>
    </div>
  );
};
