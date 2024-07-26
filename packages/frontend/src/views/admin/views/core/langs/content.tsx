'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsTableLangsCoreAdmin } from './table/actions/actions';
import { EnabledRowTableLangsCoreAdmin } from './enabled-row';
import { Admin__Core_Languages__ShowQuery } from '@/graphql/graphql';
import { Badge } from '@/components/ui/badge';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/data-table/data-table';

export const ContentLangsCoreAdminView = ({
  core_languages__show: { edges, pageInfo },
}: Admin__Core_Languages__ShowQuery) => {
  const t = useTranslations('admin.core.langs');
  const tCore = useTranslations('core');

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      searchPlaceholder={t('search_placeholder')}
      defaultPageSize={10}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc',
      }}
      columns={[
        {
          id: 'name',
          text: tCore('table.name'),
          cell: ({ data }) => {
            return (
              <div className="flex items-center gap-4">
                <span>{data.name}</span>
                {data.default && <Badge>{tCore('default')}</Badge>}
              </div>
            );
          },
        },
        {
          id: 'code',
          text: t('table.key'),
        },
        {
          id: 'locale',
          text: t('table.locale'),
        },
        {
          id: 'time_24',
          text: t('table.time_24'),
          cell: ({ data }) => {
            return data.time_24 ? tCore('yes') : tCore('no');
          },
        },
        {
          id: 'created',
          text: tCore('table.created'),
          sortable: true,
          cell: ({ data }) => {
            return <DateFormat date={data.created} />;
          },
        },
        {
          id: 'enabled',
          text: tCore('table.enabled'),
          cell: ({ data }) => {
            return <EnabledRowTableLangsCoreAdmin data={data} />;
          },
        },
        {
          id: 'actions',
          cell: ({ data }) => {
            return <ActionsTableLangsCoreAdmin {...data} />;
          },
        },
      ]}
    />
  );
};
