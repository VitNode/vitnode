import { useTranslations } from 'next-intl';

import { Loader } from '@/components/loader/loader';
import { useLangsAdminAPI } from './hooks/use-langs-admin-api';
import { DataTable } from '@/components/data-table/data-table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useEditLangsAdminAPI } from './hooks/use-edit-langs-admin-api';

export const ContentTableLangsCoreAdmin = () => {
  const t = useTranslations('admin');
  const { data, isFetching, isLoading } = useLangsAdminAPI();
  const { mutateAsync } = useEditLangsAdminAPI();

  if (isLoading && !isFetching) return <Loader />;
  if (!data) return <Loader />;

  return (
    <DataTable
      data={data.show_core_languages.edges}
      pageInfo={data.show_core_languages.pageInfo}
      defaultItemsPerPage={10}
      columns={[
        {
          header: t('core.langs.table.name'),
          accessorKey: 'name',
          cell: ({ row }) => {
            const data = row.original;

            return (
              <div className="flex items-center gap-4">
                <span>{data.name}</span>
                {data.default && <Badge>{t('default')}</Badge>}
              </div>
            );
          }
        },
        {
          header: t('core.langs.table.enabled'),
          accessorKey: 'enabled',
          cell: ({ row }) => {
            const data = row.original;

            return (
              <Switch
                checked={data.enabled}
                disabled={data.default || data.protected}
                onClick={async () => {
                  await mutateAsync({
                    ...data,
                    enabled: !data.enabled
                  });
                }}
              />
            );
          }
        },
        {
          header: t('core.langs.table.key'),
          accessorKey: 'id'
        },
        {
          header: '',
          accessorKey: 'actions',
          cell: ({ row }) => {
            const data = row.original;

            return <div>Actions = {data.id}</div>;
          }
        }
      ]}
    />
  );
};
