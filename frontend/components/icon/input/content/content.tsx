import { useState } from "react";
import { useTranslations } from "next-intl";

import type { IconDynamicNames } from "@/components/icon-dynamic";
import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";
import { Input } from "@/components/ui/input";
import { IconsContentIconInput } from "./icons/icons";
import { EmojisContentIconInput } from "./emojis/emojis";

export interface IconInputProps {
  onChange: (icon: IconDynamicNames | string) => void;
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

  return (
    <>
      <div className="flex flex-col gap-3 sticky top-0 bg-popover pb-3 z-10">
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

        <Input
          placeholder={t(
            activeTab === Tab.Icon ? "icons.placeholder" : "emojis.placeholder"
          )}
          onChange={e => setSearch(e.target.value)}
          value={search}
          className="h-9"
        />
      </div>

      {activeTab === Tab.Icon ? (
        <IconsContentIconInput search={search} {...props} />
      ) : (
        <EmojisContentIconInput search={search} {...props} />
      )}
    </>
  );
};
