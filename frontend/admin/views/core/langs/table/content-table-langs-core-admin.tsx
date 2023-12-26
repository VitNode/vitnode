import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ActionsTableLangsCoreAdmin } from './actions/actions-table-langs-core-admin';
import type { ShowCoreLanguages } from '@/graphql/hooks';
import { mutationApi } from './actions/edit/mutation-api';
import { useToast } from '@/components/ui/use-toast';
import type { LangsCoreAdminViewProps } from '../langs-core-admin-view';

export const ContentTableLangsCoreAdmin = ({ data }: LangsCoreAdminViewProps) => {
  const t = useTranslations('admin.core.langs');
  const tAdmin = useTranslations('admin');
  const tCore = useTranslations('core');
  const { toast } = useToast();

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

  return (
    <>
      <DataTable
        data={data?.core_languages__show.edges ?? []}
        pageInfo={data?.core_languages__show.pageInfo}
        defaultPageSize={10}
        columns={columns}
      />
    </>
  );
};
