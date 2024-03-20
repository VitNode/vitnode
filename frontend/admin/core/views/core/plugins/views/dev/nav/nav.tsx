import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { CreateNavDevPluginAdmin } from "./create/create";
import type { Admin__Core_Plugins__Nav__ShowQuery } from "@/graphql/hooks";
import { TableNavDevPluginAdmin } from "./table/table";

export const NavDevPluginAdminView = (
  props: Admin__Core_Plugins__Nav__ShowQuery
) => {
  const t = useTranslations("admin.core.plugins.dev.nav");

  return (
    <div>
      <HeaderContent h1={t("title")}>
        <CreateNavDevPluginAdmin />
      </HeaderContent>

      <TableNavDevPluginAdmin {...props} />
    </div>
  );
};
