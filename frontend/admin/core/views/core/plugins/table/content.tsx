import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';
import { ExternalLink } from 'lucide-react';

import type { Core_Plugins__Admin__ShowQuery, ShowAdminPlugins } from '@/graphql/hooks';
import { Badge } from '@/components/ui/badge';
import { HeaderSortingDataTable } from '@/components/data-table/header';
import { DateFormat } from '@/components/date-format/date-format';
import { DataTable } from '@/components/data-table/data-table';
import { Switch } from '@/components/ui/switch';
import { ActionsItemPluginsAdmin } from './actions/actions';

export const ContentTablePluginsAdmin = ({
  core_plugins__admin__show: { edges, pageInfo }
}: Core_Plugins__Admin__ShowQuery) => {
  const t = useTranslations('core');

  const columns: ColumnDef<ShowAdminPlugins>[] = useMemo(
    () => [
      {
        header: t('table.name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{data.name}</span>
              {data.default && <Badge variant="outline">{t('default')}</Badge>}
            </div>
          );
        }
      },
      {
        header: t('table.version'),
        accessorKey: 'version'
      },
      {
        header: t('table.author'),
        accessorKey: 'author',
        cell: ({ row }) => {
          const data = row.original;

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
      },
      {
        header: val => {
          return <HeaderSortingDataTable {...val}>{t('table.created')}</HeaderSortingDataTable>;
        },
        accessorKey: 'created',
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.created} />;
        }
      },
      {
        header: t('table.enabled'),
        accessorKey: 'enabled',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <Switch
              disabled={data.default || data.protected}
              checked={data.enabled}
              onClick={async () => {
                // const mutation = await mutationApi({
                //   ...data,
                //   enabled: !data.enabled
                // });
                // if (mutation.error) {
                //   toast.error(tCore('errors.title'), {
                //     description: tCore('errors.internal_server_error')
                //   });
                //   return;
                // }
              }}
            />
          );
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsItemPluginsAdmin {...data} />;
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      columns={columns}
      // searchPlaceholder={t('search_placeholder')}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc'
      }}
    />
  );
};
