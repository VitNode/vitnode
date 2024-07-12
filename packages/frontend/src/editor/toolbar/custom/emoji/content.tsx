import { useTranslations } from 'next-intl';
import React from 'react';
import { Input } from 'vitnode-frontend/components/ui/input';
import { CONFIG } from 'vitnode-frontend/helpers/config-with-env';

import { SkinSelectEmojisContentIconInput } from '@/components/icon/input/content/emojis/skin-select';
import { EmojisContentIconInput } from '@/components/icon/input/content/emojis/emojis';

import { useEditorState } from '../../../hooks/use-editor-state';

interface Props {
  setIsOpen?: (open: boolean) => void;
}

export const ContentEmojiToolbarEditor = ({ setIsOpen }: Props) => {
  const t = useTranslations('core.icon_picker');
  const { editor } = useEditorState();
  const [search, setSearch] = React.useState('');
  const localStorageSkinToneIndex = localStorage.getItem(
    CONFIG.local_storage.editor_skin_tone,
  );
  const [skinToneIndex, setSkinToneIndex] = React.useState(
    localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0,
  );

  return (
    <>
      <div className="bg-popover sticky top-0 z-10 flex flex-col gap-3 p-4">
        <div className="flex gap-2">
          <Input
            placeholder={t('emojis.placeholder')}
            onChange={e => setSearch(e.target.value)}
            value={search}
            className="h-9"
          />

          <SkinSelectEmojisContentIconInput
            skinToneIndex={skinToneIndex}
            setSkinToneIndex={setSkinToneIndex}
          />
        </div>
      </div>

      <div className="max-h-64 p-4 pt-0">
        <EmojisContentIconInput
          search={search}
          onChange={emoji => {
            editor.commands.insertContent(emoji);
            setIsOpen?.(false);
          }}
          skinToneIndex={skinToneIndex}
          classNameHeaders="top-[4rem]"
          value=""
        />
      </div>
    </>
  );
};
