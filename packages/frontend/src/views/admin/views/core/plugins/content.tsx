'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import { ActionsItemPluginsAdmin } from './table/actions/actions';

import {
  Admin__Core_Plugins__ShowQuery,
  ShowAdminPlugins,
} from '../../../../../graphql/graphql';
import { HeaderSortingDataTable } from '../../../../../components/data-table/header';
import { DateFormat } from '../../../../../components/date-format';
import { DataTable } from '../../../../../components/data-table/data-table';
import { Badge } from '../../../../../components/ui/badge';

export const ContentPluginsCoreAdminView = ({
  admin__core_plugins__show: { edges, pageInfo },
}: Admin__Core_Plugins__ShowQuery) => {
  const t = useTranslations('admin.core.plugins');
  const tCore = useTranslations('core');

  const columns: ColumnDef<ShowAdminPlugins>[] = React.useMemo(
    () => [
      {
        header: tCore('table.name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{data.name}</span>
                {data.default && <Badge>{tCore('default')}</Badge>}
              </div>
              {data.description && (
                <p className="text-muted-foreground max-w-80 truncate text-sm">
                  {data.description}
                </p>
              )}
            </div>
          );
        },
      },
      {
        header: tCore('table.version'),
        accessorKey: 'version',
        cell: ({ row }) => {
          const data = row.original;

          if (!data.version_code) return null;

          return (
            <span className="flex gap-1">
              <span>{data.version}</span>
              <span className="text-muted-foreground">
                ({data.version_code})
              </span>
            </span>
          );
        },
      },
      {
        header: tCore('table.author'),
        accessorKey: 'author',
        cell: ({ row }) => {
          const data = row.original;

          if (data.author_url) {
            return (
              <a
                href={data.author_url}
                className="flex gap-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                {data.author} <ExternalLink className="size-4" />
              </a>
            );
          }

          return <span className="flex gap-1">{data.author}</span>;
        },
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {tCore('table.updated')}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: 'updated',
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.updated} />;
        },
      },
      // {
      //   header: tCore("table.enabled"),
      //   accessorKey: "enabled",
      //   cell: ({ row }) => {
      //     const data = row.original;

      //     return (
      //       <Switch
      //         disabled={data.default}
      //         checked={data.enabled}
      //         onClick={async () => {
      //           // const mutation = await mutationApi({
      //           //   ...data,
      //           //   enabled: !data.enabled
      //           // });
      //           // if (mutation.error) {
      //           //   toast.error(tCore('errors.title'), {
      //           //     description: tCore('errors.internal_server_error')
      //           //   });
      //           //   return;
      //           // }
      //         }}
      //       />
      //     );
      //   }
      // },
      {
        id: 'actions',
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsItemPluginsAdmin {...data} />;
        },
      },
    ],
    [],
  );

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      columns={columns}
      searchPlaceholder={t('search_placeholder')}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
    />
  );
};
