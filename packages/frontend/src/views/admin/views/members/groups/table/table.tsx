'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsTableGroupsMembersAdmin } from './actions/actions';
import { Admin__Core_Groups__ShowQuery } from '@/graphql/graphql';
import { useTextLang } from '@/hooks/use-text-lang';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/navigation';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';

export const TableGroupsMembersAdmin = ({
  admin__core_groups__show: { edges, pageInfo },
}: Admin__Core_Groups__ShowQuery) => {
  const t = useTranslations('admin.members.groups');
  const tCore = useTranslations('core');
  const { convertText } = useTextLang();

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      columns={[
        {
          id: 'name',
          title: tCore('table.name'),
          cell: ({ row }) => {
            return (
              <div className="flex items-center gap-4">
                <span>{convertText(row.name)}</span>
                {row.default && <Badge>{t('default')}</Badge>}
                {row.root && <Badge>{t('root')}</Badge>}
              </div>
            );
          },
        },
        {
          id: 'users_count',
          title: t('table.users_count'),
          cell: ({ row }) => {
            if (row.guest) return null;

            return (
              <Link href={`/admin/members/users?groups=${row.id}`}>
                {row.users_count}
              </Link>
            );
          },
        },
        {
          id: 'updated',
          title: tCore('table.updated'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.updated} />;
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return <ActionsTableGroupsMembersAdmin {...row} />;
          },
        },
      ]}
      searchPlaceholder={t('search_placeholder')}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
    />
  );
};
