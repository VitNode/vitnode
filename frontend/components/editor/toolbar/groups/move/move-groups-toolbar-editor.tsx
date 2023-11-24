import { RedoMoveGroupsToolbarEditor } from './redo-move-groups-toolbar-editor';
import { UndoMoveGroupsToolbarEditor } from './undo-move-groups-toolbar-editor';

export const MoveGroupsToolbarEditor = () => {
  return (
    <>
      <UndoMoveGroupsToolbarEditor />
      <RedoMoveGroupsToolbarEditor />
    </>
  );
};
