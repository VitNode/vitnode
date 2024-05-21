import { lazy } from "react";
import { useTranslations } from "next-intl";

import { FilterToolbarDataTable } from "@/components/data-table/toolbar/filter/filter";

const ContentGroupsFiltersUsersMembersAdmin = lazy(async () =>
  import("./content-groups-filters-users-members-admin").then(module => ({
    default: module.ContentGroupsFiltersUsersMembersAdmin
  }))
);

export const GroupsFiltersUsersMembersAdmin = () => {
  const t = useTranslations("admin.members.users.filters");

  return (
    <FilterToolbarDataTable title={t("groups")} id="groups">
      <ContentGroupsFiltersUsersMembersAdmin />
    </FilterToolbarDataTable>
  );
};
