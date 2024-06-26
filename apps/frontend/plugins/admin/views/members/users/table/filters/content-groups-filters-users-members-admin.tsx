import { useTextLang } from 'vitnode-frontend/hooks/use-text-lang';
import { ContentFilterToolbarDataTable } from 'vitnode-frontend/components/data-table/toolbar/filter/content/content';

import { useShortShowGroupsAdminAPI } from '@/plugins/admin/hooks/api/use-short-show-groups-admin-api';

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
            value: `${group.id}`,
          })) ?? []
      }
    />
  );
};
