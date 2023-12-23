import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Loader } from '@/components/loader/loader';
import { useLangsAdminAPI } from './hooks/use-langs-admin-api';
import { DataTable } from '@/components/data-table/data-table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ActionsTableLangsCoreAdmin } from './actions/actions-table-langs-core-admin';
import type { Core_Languages__ShowQuery, ShowCoreLanguages } from '@/graphql/hooks';
import { mutationApi } from './actions/edit/mutation-api';
import { useToast } from '@/components/ui/use-toast';
import { APIKeys } from '@/graphql/api-keys';
import { usePaginationAPI } from '@/hooks/core/utils/use-pagination-api';

import { ErrorAdminView } from '../../../../global/error-admin-view';

export const ContentTableLangsCoreAdmin = () => {
  const t = useTranslations('admin.core.langs');
  const tAdmin = useTranslations('admin');
  const tCore = useTranslations('core');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const variables = usePaginationAPI({
    defaultPageSize: 10
  });
  const { data, defaultPageSize, isError, isFetching, isLoading } = useLangsAdminAPI();

  const columns: ColumnDef<ShowCoreLanguages>[] = useMemo(
    () => [
      {
        header: t('table.name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center gap-4">
              <span>{data.name}</span>
              {data.default && <Badge>{tAdmin('default')}</Badge>}
            </div>
          );
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
                queryClient.setQueryData<Core_Languages__ShowQuery>(
                  [APIKeys.LANGUAGES_ADMIN, { ...variables }],
                  old => {
                    if (!old) return old;

                    return {
                      ...old,
                      core_languages__show: {
                        ...old.core_languages__show,
                        edges: old.core_languages__show.edges.map(edge => {
                          if (edge.id === data.id) {
                            return {
                              ...edge,
                              node: {
                                ...edge,
                                enabled: !data.enabled
                              }
                            };
                          }

                          return edge;
                        })
                      }
                    };
                  }
                );

                const mutation = await mutationApi({
                  ...data,
                  enabled: !data.enabled
                });
                if (mutation.error) {
                  toast({
                    title: tCore('errors.title'),
                    description: tCore('errors.internal_server_error'),
                    variant: 'destructive'
                  });

                  return;
                }
              }}
            />
          );
        }
      },
      {
        header: t('table.key'),
        accessorKey: 'id'
      },
      {
        header: '',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return <ActionsTableLangsCoreAdmin {...row.original} />;
        }
      }
    ],
    []
  );

  if (isLoading) return <Loader />;
  if (isError) return <ErrorAdminView />;

  return (
    <>
      <DataTable
        data={data?.core_languages__show.edges ?? []}
        pageInfo={data?.core_languages__show.pageInfo}
        defaultPageSize={defaultPageSize}
        columns={columns}
        isFetching={isFetching}
      />
    </>
  );
};
