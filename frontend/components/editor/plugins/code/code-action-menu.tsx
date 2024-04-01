import { createPortal } from "react-dom";

import { ContainerCodeActionMenuPluginEditor } from "./container-code-action-menu";

interface Props {
  anchorElem?: HTMLElement;
}

export const CodeActionMenuPluginEditor = ({
  anchorElem = document.body
}: Props): JSX.Element => {
  return createPortal(
    <ContainerCodeActionMenuPluginEditor anchorElem={anchorElem} />,
    anchorElem
  );
};
