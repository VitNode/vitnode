import { BoldTextGroupsToolbarEditor } from './bold-text-groups-toolbar-editor';
import { ItalicTextGroupsToolbarEditor } from './italic-text-groups-toolbar-editor';
import { StrikethroughTextGroupsToolbarEditor } from './strikethrough-text-groups-toolbar-editor';
import { UnderlineTextGroupsToolbarEditor } from './underline-text-groups-toolbar-editor';

import { BLOCK_NAMES, useEditor } from '../../hooks/use-editor';

export const TextGroupsToolbarEditor = () => {
  const { blockType } = useEditor();
  if (blockType === BLOCK_NAMES.CODE) return null;

  return (
    <>
      <BoldTextGroupsToolbarEditor />
      <ItalicTextGroupsToolbarEditor />
      <UnderlineTextGroupsToolbarEditor />
      <StrikethroughTextGroupsToolbarEditor />
    </>
  );
};
