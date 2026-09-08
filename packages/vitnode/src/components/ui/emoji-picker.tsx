import { EmojiPicker as Picker } from "@ferrucc-io/emoji-picker";
import React from "react";
import { useTranslations } from "use-intl";

const EMOJIS_PER_ROW = 8;
const EMOJI_SIZE = 32;

export const EmojiPicker = ({
  autoFocus,
  height = 288,
  onSelect,
}: {
  autoFocus?: boolean;
  height?: number;
  onSelect: (emoji: string) => void;
}) => {
  const t = useTranslations("core.global.emoji_icon_picker");

  return (
    <Picker
      className="h-auto w-full rounded-none border-0 bg-transparent shadow-none focus:ring-0"
      emojiSize={EMOJI_SIZE}
      emojisPerRow={EMOJIS_PER_ROW}
      onEmojiSelect={onSelect}
    >
      <Picker.Header className="px-2 pt-2 pb-1">
        <Picker.Input
          autoFocus={autoFocus}
          className="bg-muted text-foreground focus:ring-ring h-8 focus:ring-2"
          placeholder={t("search_emoji")}
        />
      </Picker.Header>

      <Picker.Group>
        <Picker.List containerHeight={height} />
      </Picker.Group>

      <Picker.Preview className="flex min-h-11 items-center border-x-0 border-t border-b-0 bg-transparent px-3 py-1">
        {({ previewedEmoji }) => (
          <span className="flex min-w-0 items-center gap-2">
            {previewedEmoji ? (
              <>
                <span aria-hidden className="text-lg leading-none">
                  {previewedEmoji.emoji}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {previewedEmoji.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground truncate text-xs">
                {t("hint_emoji")}
              </span>
            )}
          </span>
        )}
      </Picker.Preview>
    </Picker>
  );
};
