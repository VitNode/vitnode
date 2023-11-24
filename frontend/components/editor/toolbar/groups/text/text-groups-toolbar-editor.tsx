import { BoldTextGroupsToolbarEditor } from './bold-text-groups-toolbar-editor';
import { ItalicTextGroupsToolbarEditor } from './italic-text-groups-toolbar-editor';
import { UnderlineTextGroupsToolbarEditor } from './underline-text-groups-toolbar-editor';

export const TextGroupsToolbarEditor = () => {
  return (
    <>
      <BoldTextGroupsToolbarEditor />
      <ItalicTextGroupsToolbarEditor />
      <UnderlineTextGroupsToolbarEditor />
    </>
  );
};
