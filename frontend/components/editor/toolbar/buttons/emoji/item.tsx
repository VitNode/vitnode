import { Emoji } from '@emoji-mart/data';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createTextNode, $getRoot, $getSelection, $isRangeSelection } from 'lexical';

import { Button } from '@/components/ui/button';

interface Props {
  emoji: Emoji;
}

export const ItemEmojiButtonEditor = ({ emoji }: Props) => {
  const [editor] = useLexicalComposerContext();

  return (
    <Button
      className="text-3xl"
      variant="ghost"
      size="icon"
      style={{
        fontFamily:
          '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      }}
      onClick={() => {
        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) {
            return;
          }

          selection.insertNodes([$createTextNode(emoji.skins[0].native)]);
        });
      }}
    >
      {emoji.skins[0].native}
    </Button>
  );
};
