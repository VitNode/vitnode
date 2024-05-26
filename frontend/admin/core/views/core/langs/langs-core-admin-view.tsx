import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TableLangsCoreAdmin } from "./table/table";
import { Core_Languages__ShowQuery } from "@/graphql/hooks";
import { ActionsLangsAdmin } from "./actions/actions";
import { RebuildRequiredAdmin } from "@/admin/core/global/rebuild-required";
import { Card } from "@/components/ui/card";

export interface LangsCoreAdminViewProps {
  data: Core_Languages__ShowQuery;
}

export const LangsCoreAdminView = (props: LangsCoreAdminViewProps) => {
  const t = useTranslations("admin.core.langs");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsLangsAdmin />
      </HeaderContent>

      <Card className="p-6">
        <RebuildRequiredAdmin />
        <TableLangsCoreAdmin {...props} />
      </Card>
    </>
  );
};
