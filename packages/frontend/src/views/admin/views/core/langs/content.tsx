'use client';

import { useTranslations } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import { ActionsTableLangsCoreAdmin } from './table/actions/actions';
import { EnabledRowTableLangsCoreAdmin } from './enabled-row';
import {
  Admin__Core_Languages__ShowQuery,
  ShowCoreLanguages,
} from '@/graphql/graphql';
import { Badge } from '@/components/ui/badge';
import { HeaderSortingDataTable } from '@/components/data-table/header';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/data-table/data-table';

export const ContentLangsCoreAdminView = ({
  core_languages__show: { edges, pageInfo },
}: Admin__Core_Languages__ShowQuery) => {
  const t = useTranslations('admin.core.langs');
  const tCore = useTranslations('core');

  const columns: ColumnDef<ShowCoreLanguages>[] = React.useMemo(
    () => [
      {
        header: tCore('table.name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center gap-4">
              <span>{data.name}</span>
              {data.default && <Badge>{tCore('default')}</Badge>}
            </div>
          );
        },
      },
      {
        header: t('table.key'),
        accessorKey: 'code',
      },
      {
        header: t('table.locale'),
        accessorKey: 'locale',
      },
      {
        header: t('table.time_24'),
        accessorKey: 'time_24',
        cell: ({ row }) => {
          const data = row.original;

          return data.time_24 ? tCore('yes') : tCore('no');
        },
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {tCore('table.created')}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: 'created',
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.created} />;
        },
      },
      {
        header: tCore('table.enabled'),
        accessorKey: 'enabled',
        cell: ({ row }) => {
          const data = row.original;

          return <EnabledRowTableLangsCoreAdmin data={data} />;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return <ActionsTableLangsCoreAdmin {...row.original} />;
        },
      },
    ],
    [],
  );

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
      columns={columns}
    />
  );
};
