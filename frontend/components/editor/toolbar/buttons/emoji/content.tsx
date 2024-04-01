import { useState } from "react";
import data from "@emoji-mart/data";
import type { Emoji, EmojiMartData } from "@emoji-mart/data";
import { init, SearchIndex } from "emoji-mart";
import { useTranslations } from "next-intl";

import { ItemEmojiButtonEditor } from "./item";
import { TabsEmojiButtonEditor } from "./tabs";
import { Input } from "@/components/ui/input";
import { SkinSelectEmojiButtonEditor } from "./skin-select";
import { CONFIG } from "@/config";

init({ data });

const emojiMart = data as EmojiMartData;

export interface ContentEmojiButtonEditorProps {
  setOpen: (open: boolean) => void;
}

export const ContentEmojiButtonEditor = ({
  setOpen
}: ContentEmojiButtonEditorProps): JSX.Element => {
  const localStorageSkinToneIndex = localStorage.getItem(
    CONFIG.local_storage.editor_skin_tone
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [skinToneIndex, setSkinToneIndex] = useState(
    localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0
  );
  const t = useTranslations("core");

  const search = async (value: string): Promise<void> => {
    setSearchValue(value);
    if (value === "") return setSearchResults(null);

    const emojis: Emoji[] = await SearchIndex.search(value);
    setSearchResults(emojis.map((emoji): string => emoji.id));
  };

  const categories =
    activeCategory === "all"
      ? emojiMart.categories
      : emojiMart.categories.filter(
          (category): boolean => category.id === activeCategory
        );

  return (
    <>
      <div className="sticky top-0 z-10 bg-popover">
        <TabsEmojiButtonEditor
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchValue={searchValue}
          onResetSearch={async (): Promise<void> => {
            if (searchValue.length === 0) return;

            await search("");
          }}
        />

        <div className="px-5 py-3 flex gap-2">
          <Input
            className="h-9"
            onChange={async (e): Promise<void> => await search(e.target.value)}
            value={searchValue}
            placeholder={t("search_placeholder")}
          />
          <SkinSelectEmojiButtonEditor
            skinToneIndex={skinToneIndex}
            setSkinToneIndex={setSkinToneIndex}
          />
        </div>
      </div>

      <div className="h-48">
        {searchValue ? (
          <div>
            <div className="px-5 pb-2 text-sm sticky top-[6rem] bg-popover/80 backdrop-blur">
              {t("editor.emoji.search_results")}
            </div>
            <div className="px-5 pb-3 pt-1">
              {searchResults?.length === 0 ? (
                <div className="p-2 text-muted-foreground">
                  {t("no_results")}
                </div>
              ) : (
                searchResults?.map((id): JSX.Element => {
                  const emoji = emojiMart.emojis[id];

                  return (
                    <ItemEmojiButtonEditor
                      key={`search_${id}`}
                      emoji={emoji}
                      skinToneIndex={skinToneIndex}
                      onClick={(): void => setOpen(false)}
                    />
                  );
                })
              )}
            </div>
          </div>
        ) : (
          categories.map((category): JSX.Element => {
            return (
              <div key={category.id}>
                <div className="px-5 pb-2 text-sm sticky top-[6rem] bg-popover/80 backdrop-blur">
                  {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/*  @ts-expect-error */}
                  {t(`editor.emoji.categories.${category.id}`)}
                </div>
                <div className="px-5 pb-3 pt-1">
                  {category.emojis.map((id): JSX.Element => {
                    const emoji = emojiMart.emojis[id];

                    return (
                      <ItemEmojiButtonEditor
                        key={`${id}_${category.id}`}
                        emoji={emoji}
                        skinToneIndex={skinToneIndex}
                        onClick={(): void => setOpen(false)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
