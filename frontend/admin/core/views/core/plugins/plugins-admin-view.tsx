import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TablePluginsAdmin } from "./table/table";
import { ActionsPluginsAdmin } from "./actions/actions";
import type { Admin__Core_Plugins__ShowQuery } from "@/graphql/hooks";

export const PluginsCoreAdminView = (props: Admin__Core_Plugins__ShowQuery) => {
  const t = useTranslations("admin.core.plugins");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsPluginsAdmin />
      </HeaderContent>

      <TablePluginsAdmin {...props} />
    </>
  );
};
