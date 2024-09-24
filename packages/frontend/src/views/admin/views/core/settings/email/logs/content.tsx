'use client';

import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Admin__Core_Email__LogsQuery } from '@/graphql/queries/admin/settings/email/admin__core_email__logs.generated';
import { useTranslations } from 'next-intl';

export const ContentLogsEmailSettingsAdmin = ({
  admin__core_email__logs: { edges, pageInfo },
}: Admin__Core_Email__LogsQuery) => {
  const t = useTranslations('admin.core.settings.email.logs');

  return (
    <>
      <DataTable
        columns={[
          {
            id: 'id',
            title: t('id'),
          },
          {
            id: 'to',
            title: t('to'),
          },
          {
            id: 'provider',
            title: t('provider'),
            cell: ({ row }) => {
              return <Badge variant="secondary">{row.provider}</Badge>;
            },
          },
          {
            id: 'subject',
            title: t('subject'),
            cell: ({ row }) => {
              return (
                <span className="line-clamp-1 max-w-xs">{row.subject}</span>
              );
            },
          },
          {
            id: 'created',
            title: t('created'),
            cell: ({ row }) => {
              return <DateFormat date={row.created} />;
            },
          },
          {
            id: 'error',
            title: t('error'),
            cell: ({ row }) => {
              return <span className="line-clamp-1 max-w-xs">{row.error}</span>;
            },
          },
        ]}
        data={edges}
        defaultSorting={{
          sortBy: 'created',
          sortDirection: 'desc',
        }}
        pageInfo={pageInfo}
      />
    </>
  );
};
