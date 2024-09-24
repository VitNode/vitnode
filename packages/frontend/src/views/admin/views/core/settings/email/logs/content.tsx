'use client';

import { DataTable } from '@/components/ui/data-table';
import { useTranslations } from 'next-intl';

export const ContentLogsEmailSettingsAdmin = () => {
  const t = useTranslations('admin.core.settings.email.logs');

  return (
    <>
      <DataTable
        columns={[
          {
            id: 'from',
            title: t('from'),
          },
          {
            id: 'subject',
            title: t('subject'),
          },
          {
            id: 'created',
            title: t('created'),
          },
          {
            id: 'error',
            title: t('error'),
          },
        ]}
        data={[]}
        defaultSorting={{
          sortBy: 'created',
          sortDirection: 'desc',
        }}
      />
    </>
  );
};
