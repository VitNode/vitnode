import {
  BadgePlus,
  ChevronDownIcon,
  List,
  ListOrdered,
  Strikethrough,
} from 'lucide-react';

import { ToggleToolbarEditor } from '../toggle';
import { ButtonToolbarEditor } from '../button';

import { useEditorState } from '../../hooks/use-editor-state';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';

export const PlusToolbarEditor = () => {
  const { editor } = useEditorState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor
          name="extra_tools"
          active={
            editor.isActive('strike') ||
            editor.isActive('bulletList') ||
            editor.isActive('orderedList')
          }
          className="h-9 w-14 justify-center gap-1 p-0 [&>svg:last-child]:size-4 [&>svg:not(:last-child)]:size-5"
        >
          <BadgePlus />
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="flex w-fit max-w-80 flex-wrap gap-1 p-2">
        <ToggleToolbarEditor
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered />
        </ToggleToolbarEditor>
      </PopoverContent>
    </Popover>
  );
};
