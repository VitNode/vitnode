import { Bold, Italic, Underline } from "lucide-react";

import { ToggleToolbarEditor } from "./toggle";
import { LinkToolbarEditor } from "./custom/link/link";
import { HeadingToolbarEditor } from "./custom/heading";
import { useGlobals } from "@/plugins/core/hooks/use-globals";
import { cn } from "@/functions/classnames";
import { ColorToolbarEditor } from "./custom/color/color";
import { EmojiToolbarEditor } from "./custom/emoji/emoji";
import { MoreToolbarEditor } from "./custom/more";
import { PlusToolbarEditor } from "./custom/plus";
import { TextAlignToolbarEditor } from "./custom/text-align";
import { useEditorState } from "../hooks/use-editor-state";

export const ToolBarEditor = () => {
  const { config } = useGlobals();
  const { editor } = useEditorState();

  return (
    <div
      className={cn(
        "bg-background p-1 rounded-t-sm flex gap-1 items-center flex-wrap border-b",
        {
          "sticky top-[4rem] z-10 overflow-auto max-h-[26vh]":
            config.editor.sticky
        }
      )}
    >
      <ToggleToolbarEditor
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </ToggleToolbarEditor>

      <ToggleToolbarEditor
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
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
