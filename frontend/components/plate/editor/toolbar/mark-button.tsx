import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate-common';
import type { ReactNode } from 'react';

import { ToolbarButton } from '@/components/plate-ui/toolbar';

interface Props {
  children: ReactNode;
  nodeType: string;
  tooltip: string;
  clear?: string | string[];
}

export const MarkButton = ({ clear, nodeType, ...rest }: Props) => {
  const state = useMarkToolbarButtonState({ nodeType, clear });
  const { props } = useMarkToolbarButton(state);

  return <ToolbarButton {...props} {...rest} />;
};
