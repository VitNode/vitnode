import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TablePluginsAdmin } from "./table/table";
import { ActionsPluginsAdmin } from "./actions/actions";
import type { Admin__Core_Plugins__ShowQuery } from "@/graphql/hooks";
import { RebuildRequiredAdmin } from "@/admin/core/global/rebuild-required";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const PluginsCoreAdminView = (props: Admin__Core_Plugins__ShowQuery) => {
  const t = useTranslations("admin.core.plugins");

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>
          <ActionsPluginsAdmin />
        </HeaderContent>

        <RebuildRequiredAdmin />
      </CardHeader>

      <CardContent>
        <TablePluginsAdmin {...props} />
      </CardContent>
    </Card>
  );
};
