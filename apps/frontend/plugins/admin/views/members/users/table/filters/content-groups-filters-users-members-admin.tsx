import { ContentFilterToolbarDataTable } from "@/components/data-table/toolbar/filter/content/content";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { useShortShowGroupsAdminAPI } from "@/plugins/admin/hooks/api/use-short-show-groups-admin-api";

export const ContentGroupsFiltersUsersMembersAdmin = () => {
  const { data, isFetching, setTextSearch } = useShortShowGroupsAdminAPI();
  const { convertText } = useTextLang();

  return (
    <ContentFilterToolbarDataTable
      isFetching={isFetching}
      searchOnChange={setTextSearch}
      options={
        data?.admin__core_groups__show.edges
          .filter(item => !item.guest)
          .map(group => ({
            label: convertText(group.name),
            value: `${group.id}`
          })) ?? []
      }
    />
  );
};
