import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { ActionsForumsForumAdmin } from "./actions/actions";
import { TableForumsForumAdmin } from "./table/table";
import { Admin__Forum_Forums__ShowQuery } from "@/utils/graphql/hooks";
import { Card } from "@/components/ui/card";

export const ForumsForumAdminView = (props: Admin__Forum_Forums__ShowQuery) => {
  const t = useTranslations("admin_forum.forums");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsForumsForumAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableForumsForumAdmin {...props} />
      </Card>
    </>
  );
};
