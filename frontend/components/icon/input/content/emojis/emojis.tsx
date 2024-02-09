import emojiMartData, {
  type Emoji,
  type EmojiMartData
} from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { IconInputProps } from "../content";

interface Props extends IconInputProps {
  search: string;
  skinToneIndex: number;
}

const emojiMart = emojiMartData as EmojiMartData;

init({ data: emojiMartData });

export const EmojisContentIconInput = ({
  onChange,
  search,
  setOpen,
  skinToneIndex,
  value
}: Props) => {
  const t = useTranslations("core");
  const [searchResults, setSearchResults] = useState<string[] | null>(null);

  const setResults = async (value: string) => {
    if (!value) {
      setSearchResults(null);

      return;
    }

    const emojis: Emoji[] = await SearchIndex.search(value);
    setSearchResults(emojis.map(emoji => emoji.id));
  };

  useEffect(() => {
    setResults(search);
  }, [search]);

  if (search) {
    return (
      <div>
        <div className="pb-2 text-sm sticky top-[7.75rem] bg-popover/80 backdrop-blur">
          {t("editor.emoji.search_results")}
        </div>
        <div className="pb-3 pt-1">
          {searchResults?.length === 0 ? (
            <div className="p-2 text-muted-foreground">{t("no_results")}</div>
          ) : (
            searchResults?.map(id => {
              const emoji = emojiMart.emojis[id];

              const icon =
                emoji.skins.length > skinToneIndex
                  ? emoji.skins[skinToneIndex].native
                  : emoji.skins[0].native;

              return (
                <Button
                  key={`search_${id}`}
                  size="icon"
                  className="text-2xl"
                  tooltip={emoji.name}
                  variant={value === icon ? "default" : "ghost"}
                  onClick={() => {
                    if (value === icon) {
                      onChange("");
                      setOpen(false);

                      return;
                    }

                    onChange(icon);
                    setOpen(false);
                  }}
                >
                  {icon}
                </Button>
              );
            })
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {emojiMart.categories.map(category => (
        <div key={category.id}>
          <div className="pb-2 text-sm sticky top-[7.75rem] bg-popover/80 backdrop-blur">
            {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*  @ts-expect-error */}
            {t(`editor.emoji.categories.${category.id}`)}
          </div>
          <div className="pb-3 pt-1">
            {category.emojis.map(id => {
              const emoji = emojiMart.emojis[id];

              const icon =
                emoji.skins.length > skinToneIndex
                  ? emoji.skins[skinToneIndex].native
                  : emoji.skins[0].native;

              return (
                <Button
                  key={`${id}_${category.id}`}
                  size="icon"
                  className="text-2xl"
                  tooltip={emoji.name}
                  variant={value === icon ? "default" : "ghost"}
                  onClick={() => {
                    if (value === icon) {
                      onChange("");
                      setOpen(false);

                      return;
                    }

                    onChange(icon);
                    setOpen(false);
                  }}
                >
                  {icon}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
