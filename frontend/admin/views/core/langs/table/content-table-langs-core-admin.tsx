import { useTranslations } from 'next-intl';

import { Loader } from '@/components/loader/loader';
import { useLangsAdminAPI } from './hooks/use-langs-admin-api';
import { DataTable } from '@/components/data-table/data-table';

export const ContentTableLangsCoreAdmin = () => {
  const t = useTranslations('admin');
  const { data, isFetching, isLoading } = useLangsAdminAPI();

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
          accessorKey: 'name'
        },
        {
          header: t('core.langs.table.key'),
          accessorKey: 'id'
        }
      ]}
    />
  );
};
