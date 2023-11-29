import { createPortal } from 'react-dom';

import { ContainerCodeActionMenuPluginEditor } from './container';

interface Props {
  anchorElem?: HTMLElement;
}

export const CodeActionMenuPluginEditor = ({ anchorElem = document.body }: Props) => {
  return createPortal(<ContainerCodeActionMenuPluginEditor anchorElem={anchorElem} />, anchorElem);
};
