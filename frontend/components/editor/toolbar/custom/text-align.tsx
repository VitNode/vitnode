import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDownIcon
} from "lucide-react";

import { ButtonToolbarEditor } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ToggleToolbarEditor } from "../toggle";

import { useEditorState } from "../../hooks/use-editor-state";

export const TextAlignToolbarEditor = () => {
  const { editor } = useEditorState();

  const getCurrentIcon = () => {
    if (editor.isActive({ textAlign: "center" })) {
      return <AlignCenter />;
    } else if (editor.isActive({ textAlign: "right" })) {
      return <AlignRight />;
    } else if (editor.isActive({ textAlign: "justify" })) {
      return <AlignJustify />;
    }

    return <AlignLeft />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor
          name="align"
          className="w-14 p-0 justify-center gap-1 h-9 [&>svg:not(:last-child)]:size-5 [&>svg:last-child]:size-4"
        >
          {getCurrentIcon()}
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="p-2 flex flex-wrap gap-1 max-w-80 w-fit">
        <ToggleToolbarEditor
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() => {
            editor.commands.setTextAlign("left");
            editor.commands.focus();
          }}
        >
          <AlignLeft />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() => {
            editor.commands.setTextAlign("center");
            editor.commands.focus();
          }}
        >
          <AlignCenter />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() => {
            editor.commands.setTextAlign("right");
            editor.commands.focus();
          }}
        >
          <AlignRight />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() => {
            editor.commands.setTextAlign("justify");
            editor.commands.focus();
          }}
        >
          <AlignJustify />
        </ToggleToolbarEditor>
      </PopoverContent>
    </Popover>
  );
};
