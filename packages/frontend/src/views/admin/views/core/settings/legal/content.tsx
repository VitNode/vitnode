'use client';

import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';
import { Core_Terms__ShowQuery } from '@/graphql/queries/terms/core_terms__show.generated';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';

export const ContentLegalSettingsAdmin = ({
  core_terms__show: { edges, pageInfo },
}: Core_Terms__ShowQuery) => {
  const t = useTranslations('core.table');
  const { convertText } = useTextLang();

  return (
    <DataTable
      columns={[
        {
          title: t('title'),
          id: 'title',
          cell: ({ row }) => {
            return convertText(row.title);
          },
        },
        {
          title: t('created'),
          id: 'created',
          cell: ({ row }) => {
            return <DateFormat date={row.created} />;
          },
        },
        {
          title: t('updated'),
          id: 'updated',
          cell: ({ row }) => {
            return <DateFormat date={row.updated} />;
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return <>Action</>;
          },
        },
      ]}
      data={edges}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
      pageInfo={pageInfo}
    />
  );
};
