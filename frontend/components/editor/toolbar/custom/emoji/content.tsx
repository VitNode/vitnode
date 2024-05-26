import { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { CONFIG } from "@/config";
import { EmojisContentIconInput } from "@/components/icon/input/content/emojis/emojis";
import { SkinSelectEmojisContentIconInput } from "@/components/icon/input/content/emojis/skin-select";
import { Input } from "@/components/ui/input";

interface Props {
  editor: Editor;
}

export const ContentEmojiToolbarEditor = ({ editor }: Props) => {
  const t = useTranslations("core.icon_picker");
  const [search, setSearch] = useState("");
  const localStorageSkinToneIndex = localStorage.getItem(
    CONFIG.local_storage.editor_skin_tone
  );
  const [skinToneIndex, setSkinToneIndex] = useState(
    localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0
  );

  return (
    <>
      <div className="flex flex-col gap-3 sticky top-0 bg-popover z-10 p-4">
        <div className="flex gap-2">
          <Input
            placeholder={t("emojis.placeholder")}
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

      <div className="p-4 pt-0 max-h-64">
        <EmojisContentIconInput
          search={search}
          onChange={emoji => {
            editor.commands.insertContent(emoji);
          }}
          skinToneIndex={skinToneIndex}
          classNameHeaders="top-[4rem]"
          value=""
        />
      </div>
    </>
  );
};
