import * as React from "react";
import { useTranslations } from "next-intl";
import { CONFIG } from "vitnode-frontend/helpers";
import { Input } from "vitnode-frontend/components/ui/input";
import { Loader } from "vitnode-frontend/components/ui/loader";
import { Tabs, TabsTrigger } from "vitnode-frontend/components/ui/tabs";

import { IconLucideNames } from "@/components/icon/icon";
import { SkinSelectEmojisContentIconInput } from "./emojis/skin-select";

// import { SkinSelectEmojiButtonEditor } from "@/components/editor/toolbar/buttons/emoji/skin-select";

const EmojisContentIconInput = React.lazy(async () =>
  import("./emojis/emojis").then(module => ({
    default: module.EmojisContentIconInput,
  })),
);

const IconsContentIconInput = React.lazy(async () =>
  import("./icons/icons").then(module => ({
    default: module.IconsContentIconInput,
  })),
);

export interface IconInputProps {
  onChange: (icon: IconLucideNames | string) => void;
  setOpen: (open: boolean) => void;
  value: string;
}

enum Tab {
  Icon = "icon",
  Emoji = "emoji",
}

export const ContentIconInput = (props: IconInputProps) => {
  const t = useTranslations("core.icon_picker");
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<Tab>(Tab.Icon);
  const localStorageSkinToneIndex = localStorage.getItem(
    CONFIG.local_storage.editor_skin_tone,
  );
  const [skinToneIndex, setSkinToneIndex] = React.useState(
    localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0,
  );

  return (
    <>
      <div className="bg-popover sticky top-0 z-10 flex flex-col gap-3 p-4">
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
                : "emojis.placeholder",
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

      <div className="max-h-64 p-4 pt-0">
        <React.Suspense fallback={<Loader />}>
          {activeTab === Tab.Icon ? (
            <IconsContentIconInput search={search} {...props} />
          ) : (
            <EmojisContentIconInput
              search={search}
              skinToneIndex={skinToneIndex}
              {...props}
            />
          )}
        </React.Suspense>
      </div>
    </>
  );
};
