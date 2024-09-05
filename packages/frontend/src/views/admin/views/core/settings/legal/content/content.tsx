'use client';

import { DateFormat } from '@/components/date-format';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Admin_Core_Terms__ShowQuery } from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { useTextLang } from '@/hooks/use-text-lang';
import { Link } from '@/navigation';
import { Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DeleteContentLegalSettingsAdmin } from './actions/delete/delete';
import { EditContentLegalSettingsAdmin } from './actions/edit';

export const ContentLegalSettingsAdmin = ({
  core_terms__show: { edges, pageInfo },
}: Admin_Core_Terms__ShowQuery) => {
  const t = useTranslations('core.table');
  const tAdmin = useTranslations('admin.core.settings.legal');
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
            return (
              <>
                <Button
                  ariaLabel={tAdmin('preview')}
                  asChild
                  size="icon"
                  variant="ghost"
                >
                  <Link href={`/legal/${row.code}`} target="_blank">
                    <Eye />
                  </Link>
                </Button>

                <EditContentLegalSettingsAdmin {...row} />
                <DeleteContentLegalSettingsAdmin {...row} />
              </>
            );
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
