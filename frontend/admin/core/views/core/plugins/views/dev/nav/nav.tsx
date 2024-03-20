import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { CreateNavDevPluginAdmin } from "./create/create";

export const NavDevPluginAdminView = () => {
  const t = useTranslations("admin.core.plugins.dev.nav");

  return (
    <div>
      <HeaderContent h1={t("title")}>
        <CreateNavDevPluginAdmin />
      </HeaderContent>
    </div>
  );
};
