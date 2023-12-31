import type { ReactNode } from 'react';
import {
  useIndentListToolbarButton,
  useIndentListToolbarButtonState
} from '@udecode/plate-indent-list';

import { ToolbarButton } from '@/components/ui/toolbar';

interface Props {
  children: ReactNode;
  nodeType: string;
}

export const IndentButton = ({ nodeType, ...rest }: Props) => {
  const state = useIndentListToolbarButtonState({ nodeType });
  const { props } = useIndentListToolbarButton(state);

  return <ToolbarButton size="icon" value="bold" {...props} {...rest} />;
};
