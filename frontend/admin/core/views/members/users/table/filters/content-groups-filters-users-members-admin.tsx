import { ContentFilterToolbarDataTable } from '@/components/data-table/toolbar/filter/content/content';
import { useShortShowGroupsAdminAPI } from '@/admin/core/hooks/api/use-short-show-groups-admin-api';
import { useTextLang } from '@/hooks/core/use-text-lang';

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
        data?.core_groups__admin__show.edges
          .filter(item => !item.guest)
          .map(group => ({
            label: convertText(group.name),
            value: `${group.id}`
          })) ?? []
      }
    />
  );
};
