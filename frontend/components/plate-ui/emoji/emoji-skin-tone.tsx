import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CONFIG } from '@/config';

const skinToneEmoji = [
  '43.55deg 100% 61.37%',
  '29.17deg 100% 85.88%',
  '28.64deg 64.71% 73.33%',
  '25.05deg 48.36% 58.24%',
  '24.11deg 51.85% 42.35%',
  '20.53deg 25.68% 29.02%'
];

export const EmojiSkinTone = () => {
  const t = useTranslations('core.editor.emoji');
  const localSkinTone = localStorage.getItem(CONFIG.editor.skin_tone);
  const [skinToneIndex, setSkinToneIndex] = useState(localSkinTone ? +localSkinTone : 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex-shrink-0 size-9"
          size="icon"
          variant="ghost"
          tooltip={t('skin.title')}
        >
          <div
            className="w-5 h-5 rounded-md"
            style={{ backgroundColor: `hsl(${skinToneEmoji[skinToneIndex]})` }}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-50">
        <DropdownMenuRadioGroup
          value={`${skinToneIndex}`}
          onValueChange={item => {
            localStorage.setItem(CONFIG.editor.skin_tone, item);
            setSkinToneIndex(+item);
          }}
        >
          {skinToneEmoji.map((item, index) => (
            <DropdownMenuRadioItem
              key={item}
              value={`${index}`}
              className="flex gap-2"
              onClick={() => {
                localStorage.setItem(CONFIG.editor.skin_tone, `${index}`);
                setSkinToneIndex(index);
              }}
            >
              <div
                className="w-5 h-5 rounded-md"
                style={{ backgroundColor: `hsl(${skinToneEmoji[index]})` }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              <span>{t(`skin.skin_${index}`)}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
