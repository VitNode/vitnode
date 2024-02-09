import emojiMartData, { type EmojiMartData } from "@emoji-mart/data";

import { Button } from "@/components/ui/button";
import type { IconInputProps } from "../content";

interface Props extends IconInputProps {
  search: string;
}

const emojiMart = emojiMartData as EmojiMartData;

export const EmojisContentIconInput = ({
  onChange,
  search,
  setOpen,
  value
}: Props) => {
  return (
    <div>
      {emojiMart.categories.map(category => (
        <div key={category.id}>
          <div>{category.id}</div>
          <div>
            {category.emojis.map(id => {
              const emoji = emojiMart.emojis[id];

              return (
                <Button
                  key={`${id}_${category.id}`}
                  size="icon"
                  className="text-2xl"
                  tooltip={emoji.name}
                  variant={
                    value === emoji.skins[0].native ? "default" : "ghost"
                  }
                  onClick={() => {
                    if (value === emoji.skins[0].native) {
                      onChange("");
                      setOpen(false);

                      return;
                    }

                    onChange(emoji.skins[0].native);
                    setOpen(false);
                  }}
                >
                  {emoji.skins[0].native}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
