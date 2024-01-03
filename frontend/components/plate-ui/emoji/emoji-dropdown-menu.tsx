import { type EmojiDropdownMenuOptions, useEmojiDropdownMenuState } from '@udecode/plate-emoji';
import type { ComponentPropsWithoutRef } from 'react';
import { Smile } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { emojiCategoryIcons, emojiSearchIcons } from './emoji-icons';
import { EmojiPicker } from './emoji-picker';
import { EmojiToolbarDropdown } from './emoji-toolbar-dropdown';
import { ToolbarButton } from '../toolbar';

type EmojiDropdownMenuProps = {
  options?: EmojiDropdownMenuOptions;
} & ComponentPropsWithoutRef<typeof ToolbarButton>;

export function EmojiDropdownMenu({ options, ...props }: EmojiDropdownMenuProps) {
  const t = useTranslations('core.editor.emoji');
  const { emojiPickerState, isOpen, setIsOpen } = useEmojiDropdownMenuState(options);

  return (
    <EmojiToolbarDropdown
      control={
        <ToolbarButton tooltip={t('title')} pressed={isOpen} {...props}>
          <Smile />
        </ToolbarButton>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <EmojiPicker
        {...emojiPickerState}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        icons={{
          categories: emojiCategoryIcons,
          search: emojiSearchIcons
        }}
        settings={options?.settings}
      />
    </EmojiToolbarDropdown>
  );
}
