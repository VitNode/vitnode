import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { ActionsGroupsMembersAdmin } from "./actions/actions-groups-members-admin";
import { Admin__Core_Groups__ShowQuery } from "@/utils/graphql/hooks";
import { TableGroupsMembersAdmin } from "./table/table";
import { Card } from "@/components/ui/card";

export interface GroupsMembersAdminViewProps {
  data: Admin__Core_Groups__ShowQuery;
}

export const GroupsMembersAdminView = (props: GroupsMembersAdminViewProps) => {
  const t = useTranslations("admin.members.groups");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsGroupsMembersAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableGroupsMembersAdmin {...props} />
      </Card>
    </>
  );
};
