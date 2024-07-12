import { Baseline, ChevronDownIcon } from 'lucide-react';
import React from 'react';
import { HslColor } from 'react-colorful';
import { getHSLFromString } from 'vitnode-shared';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PickerColor } from '@/components/ui/picker-color';

import { ButtonToolbarEditor } from '../../button';
import { useEditorState } from '../../../hooks/use-editor-state';

export const ColorToolbarEditor = () => {
  const [open, setOpen] = React.useState(false);
  const { editor } = useEditorState();
  const [color, setColor] = React.useState<HslColor | null>(
    getHSLFromString(editor.getAttributes('textStyle').color),
  );

  React.useEffect(() => {
    if (!color) {
      editor.commands.unsetColor();

      return;
    }

    editor.commands.setColor(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);
  }, [color]);

  const currentColor = getHSLFromString(
    editor.getAttributes('textStyle').color,
  );

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor
          name="color_text"
          style={{
            backgroundColor: currentColor
              ? `hsl(${currentColor.h} ${currentColor.s}% ${currentColor.l}% / 10%)`
              : undefined,
            color: currentColor
              ? `hsl(${currentColor.h} ${currentColor.s}% ${currentColor.l}%)`
              : undefined,
          }}
          className="w-14 justify-center gap-1 p-0 [&>svg:last-child]:size-4 [&>svg:not(:last-child)]:size-5"
        >
          <Baseline />
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="w-auto">
        <PickerColor color={color} setColor={setColor} />
      </PopoverContent>
    </Popover>
  );
};
