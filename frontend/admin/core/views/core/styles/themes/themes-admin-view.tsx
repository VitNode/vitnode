import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { TableThemesAdmin } from "./table/table";
import type { Admin_Core_Themes__ShowQuery } from "@/graphql/hooks";
import { ActionsThemesAdmin } from "./actions/actions";

export const ThemesAdminView = (props: Admin_Core_Themes__ShowQuery) => {
  const t = useTranslations("admin.core.styles.themes");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <ActionsThemesAdmin />
      </HeaderContent>

      <TableThemesAdmin {...props} />
    </>
  );
};
