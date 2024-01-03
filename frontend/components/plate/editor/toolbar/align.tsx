import { useAlignDropdownMenu, useAlignDropdownMenuState } from '@udecode/plate-alignment';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ToolbarButton } from '@/components/plate-ui/toolbar';

const items = [
  {
    id: 'left',
    icon: <AlignLeft />
  },
  {
    id: 'center',
    icon: <AlignCenter />
  },
  {
    id: 'right',
    icon: <AlignRight />
  },
  {
    id: 'justify',
    icon: <AlignJustify />
  }
];

export const AlignToolbarEditor = () => {
  const t = useTranslations('core.editor.align');
  const state = useAlignDropdownMenuState();
  const { radioGroupProps } = useAlignDropdownMenu(state);
  const defaultIcon = items.find(item => item.id === state.value)?.icon ?? items[0].icon;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip={t('title')} className="w-16 gap-1">
          {defaultIcon} <ChevronDown />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup {...radioGroupProps}>
          {items.map(item => (
            <DropdownMenuRadioItem key={item.id} value={item.id}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {item.icon} {t(item.id)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
