import { useShortShowGroupsAdminAPI } from './hooks/use-short-show-groups-admin-api';

import { ContentFilterToolbarDataTable } from '../../../../../../../components/data-table/toolbar/filter/content/content';
import { useTextLang } from '../../../../../../../hooks/use-text-lang';

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
