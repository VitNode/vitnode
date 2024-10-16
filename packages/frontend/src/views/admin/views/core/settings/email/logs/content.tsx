'use client';

import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';
import { Admin__Core_Email__LogsQuery } from '@/graphql/queries/admin/settings/email/admin__core_email__logs.generated';
import { useTranslations } from 'next-intl';

import { ActionsLogsEmailSettingsAdmin } from './actions/actions';

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
          {
            id: 'actions',
            cell: ({ row }) => {
              return <ActionsLogsEmailSettingsAdmin {...row} />;
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
