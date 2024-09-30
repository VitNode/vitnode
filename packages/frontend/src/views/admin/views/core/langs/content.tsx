'use client';

import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Admin__Core_Languages__ShowQuery } from '@/graphql/queries/admin/languages/admin__core_languages__show.generated';
import { useTranslations } from 'next-intl';
import React from 'react';

import { EnabledRowTableLangsCoreAdmin } from './enabled-row';
import { ActionsTableLangsCoreAdmin } from './table/actions/actions';

export const ContentLangsCoreAdminView = ({
  core_languages__show: { edges, pageInfo },
}: Admin__Core_Languages__ShowQuery) => {
  const t = useTranslations('admin.core.langs');
  const tCore = useTranslations('core.global');

  return (
    <DataTable
      columns={[
        {
          id: 'name',
          title: t('table.name'),
          cell: ({ row }) => {
            return (
              <div className="flex items-center gap-4">
                <span>{row.name}</span>
                {row.default && <Badge>{tCore('default')}</Badge>}
              </div>
            );
          },
        },
        {
          id: 'code',
          title: t('table.key'),
        },
        {
          id: 'locale',
          title: t('table.locale'),
        },
        {
          id: 'time_24',
          title: t('table.time_24'),
          cell: ({ row }) => {
            return row.time_24 ? tCore('yes') : tCore('no');
          },
        },
        {
          id: 'created',
          title: t('table.created'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.created} />;
          },
        },
        {
          id: 'enabled',
          title: t('table.enabled'),
          cell: ({ row }) => {
            return <EnabledRowTableLangsCoreAdmin data={row} />;
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return <ActionsTableLangsCoreAdmin {...row} />;
          },
        },
      ]}
      data={edges}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc',
      }}
      pageInfo={pageInfo}
      searchPlaceholder={t('search_placeholder')}
    />
  );
};
