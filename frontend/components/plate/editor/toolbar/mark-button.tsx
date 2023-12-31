import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate-common';
import type { ReactNode } from 'react';

import { ToolbarButton } from '@/components/ui/toolbar';

interface Props {
  children: ReactNode;
  nodeType: string;
  clear?: string | string[];
}

export const MarkButton = ({ clear, nodeType, ...rest }: Props) => {
  const state = useMarkToolbarButtonState({ nodeType, clear });
  const { props } = useMarkToolbarButton(state);

  return <ToolbarButton size="icon" value="bold" {...props} {...rest} />;
};
