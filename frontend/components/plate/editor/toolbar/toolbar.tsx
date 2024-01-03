import { BasicMarksToolbarEditor } from './basic-marks';
import { MoreToolbarEditor } from './more';
import { BasicElementsToolbarEditor } from './basic-elements';
import { ListToolbarEditor } from './list/list';
import { Toolbar, ToolbarSeparator } from '@/components/plate-ui/toolbar';
import { EmojiDropdownMenu } from '@/components/plate-ui/emoji/emoji-dropdown-menu';
import { AlignToolbarEditor } from './align';
import { ColorsToolbarEditor } from './colors/colors';
import { LinkToolbarEditor } from './link-button';
import { LanguagesToolbarEditor, type LanguagesToolbarEditorProps } from './languages';

export const ToolbarEditor = (props: LanguagesToolbarEditorProps) => {
  return (
    <Toolbar className="sticky left-0 top-[57px] z-50 w-full overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur p-1 flex items-center gap-1 flex-wrap">
      <LanguagesToolbarEditor {...props} />
      <BasicElementsToolbarEditor />

      <ToolbarSeparator />

      <BasicMarksToolbarEditor />
      <ToolbarSeparator />
      <ColorsToolbarEditor />
      <AlignToolbarEditor />
      <ToolbarSeparator />

      <LinkToolbarEditor />
      <EmojiDropdownMenu />

      <ToolbarSeparator />

      <ListToolbarEditor />
      <ToolbarSeparator />

      <MoreToolbarEditor />
    </Toolbar>
  );
};
