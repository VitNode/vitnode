import { getTranslations } from "next-intl/server";

import { MainSettingsCoreAdmin } from "@/admin/core/views/core/settings/main/main-settings-core-admin";
import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import { getConfigFile } from "@/config/get-config-file";

export default async function Page() {
  const [t, data] = await Promise.all([
    getTranslations("admin.core.settings.main"),
    getConfigFile()
  ]);

  return (
    <>
      <HeaderContent h1={t("title")} />

      <Card className="p-6">
        <MainSettingsCoreAdmin {...data.settings.general} />
      </Card>
    </>
  );
}
