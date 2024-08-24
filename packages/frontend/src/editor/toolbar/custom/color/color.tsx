import { Baseline, ChevronDownIcon } from 'lucide-react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getHSLFromString } from '@/helpers/colors';
import { HslColor } from '@/graphql/types';

import { ButtonToolbarEditor } from '../../button';
import { useEditorState } from '../../../hooks/use-editor-state';

export const ColorToolbarEditor = () => {
  const [open, setOpen] = React.useState(false);
  const { editor } = useEditorState();
  const colorFromEditor: string = editor.getAttributes('textStyle').color;
  const [color] = React.useState<HslColor | null>(
    getHSLFromString(colorFromEditor),
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
          style={{
            backgroundColor: color
              ? `hsl(${color.h} ${color.s}% ${color.l}% / 10%)`
              : undefined,
            color: color
              ? `hsl(${color.h} ${color.s}% ${color.l}%)`
              : undefined,
          }}
          className="w-14 justify-center gap-1 p-0 [&>svg:last-child]:size-4 [&>svg:not(:last-child)]:size-5"
        >
          <Baseline />
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="w-auto">
        {/* <PickerColor color={color} setColor={setColor} /> */}
      </PopoverContent>
    </Popover>
  );
};
