import { ContentFilterToolbarDataTable } from '@/components/data-table/toolbar/filter/content/content-filter-toolbar-data-table';
import { useShortShowGroupsAdminAPI } from '@/admin/hooks/api/use-short-show-groups-admin-api';
import { useTextLang } from '@/hooks/use-text-lang';

export const ContentGroupsFiltersUsersMembersAdmin = () => {
  const { data, isFetching, setTextSearch, textSearch } = useShortShowGroupsAdminAPI();
  const { convertText } = useTextLang();

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
            label: convertText(group.name),
            value: `${group.id}`
          })) ?? []
      }
    />
  );
};
