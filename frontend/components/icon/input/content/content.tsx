import { Suspense, lazy, useState } from "react";
import { useTranslations } from "next-intl";

import type { IconLucideNames } from "@/components/icon/icon";
import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";
import { Input } from "@/components/ui/input";
import { CONFIG } from "@/config";
import { Loader } from "@/components/loader";
import { SkinSelectEmojisContentIconInput } from "./emojis/skin-select";

// import { SkinSelectEmojiButtonEditor } from "@/components/editor/toolbar/buttons/emoji/skin-select";

const EmojisContentIconInput = lazy(() =>
  import("./emojis/emojis").then(module => ({
    default: module.EmojisContentIconInput
  }))
);

const IconsContentIconInput = lazy(() =>
  import("./icons/icons").then(module => ({
    default: module.IconsContentIconInput
  }))
);

export interface IconInputProps {
  onChange: (icon: IconLucideNames | string) => void;
  setOpen: (open: boolean) => void;
  value: string;
}

enum Tab {
  Icon = "icon",
  Emoji = "emoji"
}

export const ContentIconInput = (props: IconInputProps) => {
  const t = useTranslations("core.icon_picker");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Icon);
  const localStorageSkinToneIndex = localStorage.getItem(
    CONFIG.local_storage.editor_skin_tone
  );
  const [skinToneIndex, setSkinToneIndex] = useState(
    localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0
  );

  return (
    <>
      <div className="flex flex-col gap-3 sticky top-0 bg-popover z-10 p-4">
        <Tabs>
          <TabsTrigger
            id={Tab.Icon}
            active={activeTab === Tab.Icon}
            onClick={() => setActiveTab(Tab.Icon)}
          >
            {t("tabs.icons")}
          </TabsTrigger>
          <TabsTrigger
            id={Tab.Emoji}
            active={activeTab === Tab.Emoji}
            onClick={() => setActiveTab(Tab.Emoji)}
          >
            {t("tabs.emojis")}
          </TabsTrigger>
        </Tabs>

        <div className="flex gap-2">
          <Input
            placeholder={t(
              activeTab === Tab.Icon
                ? "icons.placeholder"
                : "emojis.placeholder"
            )}
            onChange={e => setSearch(e.target.value)}
            value={search}
            className="h-9"
          />

          {activeTab === Tab.Emoji && (
            <SkinSelectEmojisContentIconInput
              skinToneIndex={skinToneIndex}
              setSkinToneIndex={setSkinToneIndex}
            />
          )}
        </div>
      </div>

      <div className="p-4 pt-0 max-h-64">
        <Suspense fallback={<Loader />}>
          {activeTab === Tab.Icon ? (
            <IconsContentIconInput search={search} {...props} />
          ) : (
            <EmojisContentIconInput
              search={search}
              skinToneIndex={skinToneIndex}
              {...props}
            />
          )}
        </Suspense>
      </div>
    </>
  );
};
