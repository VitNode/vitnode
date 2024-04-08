import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { ContentSettingsCoreAdmin } from "./content/content";
import { Card } from "@/components/ui/card";

export const SettingsCoreAdminView = () => {
  const t = useTranslations("admin");

  return (
    <>
      <HeaderContent h1={t("core.general.title")} />

      <Card className="p-6">
        <ContentSettingsCoreAdmin />
      </Card>
    </>
  );
};
