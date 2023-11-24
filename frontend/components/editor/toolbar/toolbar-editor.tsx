import { ClearFormattingToolbarEditor } from './clear-formatting-toolbar-editor';
import { SeparatorToolbarEditor } from './separator-toolbar-editor';
import { TextGroupsToolbarEditor } from './groups/text/text-groups-toolbar-editor';
import { cx } from '@/functions/classnames';
import { MoveGroupsToolbarEditor } from './groups/move/move-groups-toolbar-editor';
import { FontSizeGroupsToolbarEditor } from './groups/font-size-groups-toolbar-editor';

interface Props {
  className?: string;
}

export const ToolbarEditor = ({ className }: Props) => {
  return (
    <div
      className={cx(
        'border-b-2 rounded-t-md p-2 flex items-center sticky top-16 bg-background',
        className
      )}
    >
      <MoveGroupsToolbarEditor />
      <SeparatorToolbarEditor />

      <ClearFormattingToolbarEditor />
      <SeparatorToolbarEditor />

      <TextGroupsToolbarEditor />
      <SeparatorToolbarEditor />

      <FontSizeGroupsToolbarEditor />
    </div>
  );
};
