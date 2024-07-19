import React from 'react';
import { Ellipsis, Minus, Quote } from 'lucide-react';

import { ButtonToolbarEditor } from '../button';
import { ToggleToolbarEditor } from '../toggle';

import { useEditorState } from '../../hooks/use-editor-state';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';

export const MoreToolbarEditor = () => {
  const { editor } = useEditorState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor name="more" active={editor.isActive('link')}>
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
          pressed={editor.isActive('blockquote')}
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
