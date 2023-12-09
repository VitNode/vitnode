import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const skinToneEmoji = [
  '43.55deg 100% 61.37%',
  '29.17deg 100% 85.88%',
  '28.64deg 64.71% 73.33%',
  '25.05deg 48.36% 58.24%',
  '24.11deg 51.85% 42.35%',
  '20.53deg 25.68% 29.02%'
];

interface Props {
  setSkinToneIndex: (value: number) => void;
  skinToneIndex: number;
}

export const SkinSelectEmojiButtonEditor = ({ setSkinToneIndex, skinToneIndex }: Props) => {
  const t = useTranslations('core.editor.emoji');

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button className="flex-shrink-0 w-9 h-9" size="icon" variant="ghost">
                <div
                  className="w-5 h-5 rounded-md"
                  style={{ backgroundColor: `hsl(${skinToneEmoji[skinToneIndex]})` }}
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent>{t('skin.title')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent>
        {skinToneEmoji.map((item, index) => (
          <DropdownMenuItem
            key={item}
            className="flex gap-2"
            onClick={() => {
              setSkinToneIndex(index);
            }}
          >
            {skinToneIndex === index && <Check className="h-4 w-4" />}
            <div
              className="w-5 h-5 rounded-md"
              style={{ backgroundColor: `hsl(${skinToneEmoji[index]})` }}
            />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <span>{t(`skin.skin_${index}`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
