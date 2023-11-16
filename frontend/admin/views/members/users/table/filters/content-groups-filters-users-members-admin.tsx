import { ContentFilterToolbarDataTable } from '@/components/data-table/toolbar/filter/content/content-filter-toolbar-data-table';
import { useShortShowGroupsAdminAPI } from '@/admin/hooks/api/use-short-show-groups-admin-api';

export const ContentGroupsFiltersUsersMembersAdmin = () => {
  const { data, isFetching, setTextSearch, textSearch } = useShortShowGroupsAdminAPI();

  return (
    <ContentFilterToolbarDataTable
      isFetching={isFetching}
      searchState={{
        value: textSearch,
        onChange: setTextSearch
      }}
      options={
        data?.show_admin_groups.edges
          .filter(item => item.id !== 1)
          .map(group => ({
            label: group.name,
            value: `${group.id}`
          })) ?? []
      }
    />
  );
};
