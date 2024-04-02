import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TableUsersMembersAdmin } from "./table/table";
import type { Admin__Core_Members__ShowQuery } from "@/graphql/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface UsersMembersAdminViewProps {
  data: Admin__Core_Members__ShowQuery;
}

export const UsersMembersAdminView = (props: UsersMembersAdminViewProps) => {
  const t = useTranslations("admin.members.users");

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")} />
      </CardHeader>

      <CardContent>
        <TableUsersMembersAdmin {...props} />
      </CardContent>
    </Card>
  );
};
