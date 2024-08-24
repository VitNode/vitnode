import { Ellipsis, Minus, Quote } from 'lucide-react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import { useEditorState } from '../../hooks/use-editor-state';
import { ButtonToolbarEditor } from '../button';
import { ToggleToolbarEditor } from '../toggle';

export const MoreToolbarEditor = () => {
  const { editor } = useEditorState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor active={editor.isActive('link')} name="more">
          <Ellipsis />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit max-w-80 flex-wrap gap-1 p-2">
        <ButtonToolbarEditor
          name="horizontal_rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus />
        </ButtonToolbarEditor>

        <ToggleToolbarEditor
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          pressed={editor.isActive('blockquote')}
        >
          <Quote />
        </ToggleToolbarEditor>
      </PopoverContent>
    </Popover>
  );
};
