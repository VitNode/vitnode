import { ClearFormattingToolbarEditor } from './clear-formatting-toolbar-editor';
import { SeparatorToolbarEditor } from './separator-toolbar-editor';
import { TextGroupsToolbarEditor } from './groups/text/text-groups-toolbar-editor';
import { cx } from '@/functions/classnames';
import { MoveGroupsToolbarEditor } from './groups/move/move-groups-toolbar-editor';
import { FontSizeGroupsToolbarEditor } from './groups/font-size-groups-toolbar-editor';
import { ColorGroupsToolbarEditor } from './groups/color-groups-toolbar-editor';
import { BlockTypeGroupsToolbarEditor } from './groups/block-type-groups-toolbar-editor';
import { BLOCK_NAMES, useEditor } from './hooks/use-editor';

interface Props {
  className?: string;
}

export const ToolbarEditor = ({ className }: Props) => {
  const { blockType } = useEditor();

  return (
    <div className={cx('border-b-2 rounded-t-md sticky top-16 bg-background z-10', className)}>
      <div className="flex items-center p-2 overflow-x-auto [&>*]:flex-shrink-0">
        <MoveGroupsToolbarEditor />
        <SeparatorToolbarEditor />
        <BlockTypeGroupsToolbarEditor />

        {blockType !== BLOCK_NAMES.CODE && (
          <>
            <ClearFormattingToolbarEditor />
            <SeparatorToolbarEditor />

            <TextGroupsToolbarEditor />
            <SeparatorToolbarEditor />

            <FontSizeGroupsToolbarEditor />
            <ColorGroupsToolbarEditor type="color" />
            <ColorGroupsToolbarEditor type="background-color" />
          </>
        )}
      </div>
    </div>
  );
};
