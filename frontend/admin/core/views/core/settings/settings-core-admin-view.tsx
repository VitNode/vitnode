import { getTranslations } from "next-intl/server";

import { HeaderContent } from "@/components/header-content/header-content";
import { ContentSettingsCoreAdmin } from "./content/content";
import { Card } from "@/components/ui/card";
import { getConfigFile } from "@/functions/get-config-file";

export const SettingsCoreAdminView = async () => {
  const t = await getTranslations("admin");
  const data = await getConfigFile();

  return (
    <>
      <HeaderContent h1={t("core.general.title")} />

      <Card className="p-6">
        <ContentSettingsCoreAdmin {...data.settings.general} />
      </Card>
    </>
  );
};
