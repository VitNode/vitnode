import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { ActionsForumsForumAdmin } from "./actions/actions";
import { TableForumsForumAdmin } from "./table/table";
import type { Admin__Forum_Forums__ShowQuery } from "@/graphql/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const ForumsForumAdminView = (props: Admin__Forum_Forums__ShowQuery) => {
  const t = useTranslations("admin_forum.forums");

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>
          <ActionsForumsForumAdmin />
        </HeaderContent>
      </CardHeader>

      <CardContent>
        <TableForumsForumAdmin {...props} />
      </CardContent>
    </Card>
  );
};
