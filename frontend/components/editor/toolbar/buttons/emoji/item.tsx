import type { Emoji } from "@emoji-mart/data";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getSelection, $isRangeSelection } from "lexical";

import { Button } from "@/components/ui/button";

interface Props {
  emoji: Emoji;
  onClick: () => void;
  skinToneIndex: number;
}

export const ItemEmojiButtonEditor = ({
  emoji,
  onClick,
  skinToneIndex
}: Props) => {
  const [editor] = useLexicalComposerContext();
  const icon =
    emoji.skins.length > skinToneIndex
      ? emoji.skins[skinToneIndex].native
      : emoji.skins[0].native;

  return (
    <Button
      className="text-3xl size-9"
      variant="ghost"
      size="icon"
      style={{
        fontFamily:
          '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      }}
      ariaLabel=""
      onClick={() => {
        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) {
            return;
          }

          selection.insertNodes([$createTextNode(icon)]);
          onClick();
        });
      }}
    >
      {icon}
    </Button>
  );
};
