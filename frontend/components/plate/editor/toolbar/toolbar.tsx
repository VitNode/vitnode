import { BasicMarksToolbarEditor } from './basic-marks';
import { MoreToolbarEditor } from './more';
import { BasicElementsToolbarEditor } from './basic-elements';
import { ListToolbarEditor } from './list';
import { Toolbar, ToolbarSeparator } from '@/components/plate-ui/toolbar';
import { EmojiDropdownMenu } from '@/components/plate-ui/emoji-dropdown-menu';

export const ToolbarEditor = () => {
  return (
    <Toolbar className="sticky left-0 top-[57px] z-50 w-full overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur p-1 flex items-center gap-1 flex-wrap">
      <BasicElementsToolbarEditor />
      <BasicMarksToolbarEditor />
      <EmojiDropdownMenu />
      <MoreToolbarEditor />
      <ToolbarSeparator />
      <ListToolbarEditor />
    </Toolbar>
  );
};
