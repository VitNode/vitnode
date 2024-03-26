import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import type { Admin__Core_Staff_Moderators__ShowQuery } from "@/graphql/hooks";
import { TableModeratorsStaffAdmin } from "./table/table";
import { ActionsModeratorsStaffAdmin } from "./actions/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface ModeratorsStaffAdminViewProps {
  data: Admin__Core_Staff_Moderators__ShowQuery;
}

export const ModeratorsStaffAdminView = (
  props: ModeratorsStaffAdminViewProps
) => {
  const t = useTranslations("admin.members.staff.moderators");

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>
          <ActionsModeratorsStaffAdmin />
        </HeaderContent>
      </CardHeader>

      <CardContent>
        <TableModeratorsStaffAdmin {...props} />
      </CardContent>
    </Card>
  );
};
