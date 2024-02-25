import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { ActionsForumsForumAdmin } from "./actions/actions";
import { TableForumsForumAdmin } from "./table/table";
import type { Admin__Forum_Forums__ShowQuery } from "@/graphql/hooks";

export const ForumsForumAdminView = (props: Admin__Forum_Forums__ShowQuery) => {
  const t = useTranslations("admin.forum.forums");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsForumsForumAdmin />
      </HeaderContent>

      <TableForumsForumAdmin {...props} />
    </>
  );
};
