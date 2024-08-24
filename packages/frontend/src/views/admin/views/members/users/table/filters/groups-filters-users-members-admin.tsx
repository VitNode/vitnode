import { FilterToolbarDataTable } from '@/components/data-table/toolbar/filter/filter';
import { useTranslations } from 'next-intl';
import React from 'react';

const ContentGroupsFiltersUsersMembersAdmin = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentGroupsFiltersUsersMembersAdmin,
  })),
);

export const GroupsFiltersUsersMembersAdmin = () => {
  const t = useTranslations('admin.members.users.filters');

  return (
    <FilterToolbarDataTable id="groups" title={t('groups')}>
      <ContentGroupsFiltersUsersMembersAdmin />
    </FilterToolbarDataTable>
  );
};
