import * as React from "react";
import { Ellipsis, Minus, Quote } from "lucide-react";

import { ButtonToolbarEditor } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ToggleToolbarEditor } from "../toggle";

import { useEditorState } from "../../hooks/use-editor-state";

export const MoreToolbarEditor = () => {
  const { editor } = useEditorState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor name="more.title" active={editor.isActive("link")}>
          <Ellipsis />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="p-2 flex flex-wrap gap-1 max-w-80 w-fit">
        <ButtonToolbarEditor
          name="horizontal_rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus />
        </ButtonToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote />
        </ToggleToolbarEditor>
      </PopoverContent>
    </Popover>
  );
};
