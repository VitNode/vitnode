import {
  BadgePlus,
  ChevronDownIcon,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import { useEditorState } from '../../hooks/use-editor-state';
import { ButtonToolbarEditor } from '../button';
import { ToggleToolbarEditor } from '../toggle';

export const PlusToolbarEditor = () => {
  const { editor } = useEditorState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor
          active={
            editor.isActive('strike') ||
            editor.isActive('bulletList') ||
            editor.isActive('orderedList')
          }
          className="h-9 w-14 justify-center gap-1 p-0 [&>svg:last-child]:size-4 [&>svg:not(:last-child)]:size-5"
          name="extra_tools"
        >
          <BadgePlus />
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit max-w-80 flex-wrap gap-1 p-2">
        <ToggleToolbarEditor
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          pressed={editor.isActive('strike')}
        >
          <Strikethrough />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          pressed={editor.isActive('bulletList')}
        >
          <List />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          pressed={editor.isActive('orderedList')}
        >
          <ListOrdered />
        </ToggleToolbarEditor>
      </PopoverContent>
    </Popover>
  );
};
