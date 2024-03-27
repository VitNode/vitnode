import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TableLangsCoreAdmin } from "./table/table";
import type { Core_Languages__ShowQuery } from "@/graphql/hooks";
import { ActionsLangsAdmin } from "./actions/actions";
import { RebuildRequiredAdmin } from "@/admin/core/global/rebuild-required";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface LangsCoreAdminViewProps {
  data: Core_Languages__ShowQuery;
}

export const LangsCoreAdminView = (props: LangsCoreAdminViewProps) => {
  const t = useTranslations("admin.core.langs");

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>
          <ActionsLangsAdmin />
        </HeaderContent>

        <RebuildRequiredAdmin />
      </CardHeader>

      <CardContent>
        <TableLangsCoreAdmin {...props} />
      </CardContent>
    </Card>
  );
};
