import { Emoji } from '@emoji-mart/data';

import { Button } from '@/components/ui/button';

interface Props {
  emoji: Emoji;
}

export const ItemEmojiButtonEditor = ({ emoji }: Props) => {
  return (
    <Button
      className="text-3xl"
      variant="ghost"
      size="icon"
      style={{
        fontFamily:
          '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      }}
    >
      {emoji.skins[0].native}
    </Button>
  );
};
