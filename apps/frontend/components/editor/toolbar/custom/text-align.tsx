import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDownIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "vitnode-frontend/components/ui/popover";

import { ButtonToolbarEditor } from "../button";
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
          className="h-9 w-14 justify-center gap-1 p-0 [&>svg:last-child]:size-4 [&>svg:not(:last-child)]:size-5"
        >
          {getCurrentIcon()}
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit max-w-80 flex-wrap gap-1 p-2">
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
