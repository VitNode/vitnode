import { Editor } from "@tiptap/react";
import { Baseline } from "lucide-react";
import * as React from "react";
import { HslColor } from "react-colorful";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { PickerColor } from "@/components/color/picker/picker";
import { getHSLFromString } from "@/functions/colors";

import { ButtonToolbarEditor } from "../../button";

interface Props {
  editor: Editor;
}

export const ColorToolbarEditor = ({ editor }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState<HslColor | null>(
    getHSLFromString(editor.getAttributes("textStyle").color)
  );

  React.useEffect(() => {
    if (!color) {
      editor.commands.unsetColor();

      return;
    }

    editor.commands.setColor(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);
  }, [color]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor
          name="color_text"
          active={!!editor.getAttributes("textStyle").color}
        >
          <Baseline />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="w-auto">
        <PickerColor color={color} setColor={setColor} />
      </PopoverContent>
    </Popover>
  );
};
