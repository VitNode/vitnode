import { type ComboboxItemProps, type ComboboxOnSelectItem } from '@udecode/plate-combobox';
import {
  type EmojiItemData,
  KEY_EMOJI,
  type TEmojiCombobox,
  useEmojiComboboxState
} from '@udecode/plate-emoji';

import { Combobox } from '../combobox';

export function EmojiComboboxItem({ item }: ComboboxItemProps<EmojiItemData>) {
  const {
    data: { emoji, id }
  } = item;

  return (
    <div>
      {emoji} :{id}:
    </div>
  );
}

export function EmojiCombobox({ pluginKey = KEY_EMOJI, id = pluginKey, ...props }: TEmojiCombobox) {
  const { onSelectItem, trigger } = useEmojiComboboxState({ pluginKey });

  return (
    <Combobox
      id={id}
      trigger={trigger}
      controlled
      onSelectItem={onSelectItem as unknown as ComboboxOnSelectItem<undefined>}
      onRenderItem={EmojiComboboxItem}
      {...props}
    />
  );
}
