'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsTableGroupsMembersAdmin } from './actions/actions';
import { Admin__Core_Groups__ShowQuery } from '@/graphql/graphql';
import { useTextLang } from '@/hooks/use-text-lang';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/navigation';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/data-table/data-table';

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
      defaultPageSize={10}
      columns={[
        {
          id: 'name',
          text: tCore('table.name'),
          cell: ({ data }) => {
            return (
              <div className="flex items-center gap-4">
                <span>{convertText(data.name)}</span>
                {data.default && <Badge>{t('default')}</Badge>}
                {data.root && <Badge>{t('root')}</Badge>}
              </div>
            );
          },
        },
        {
          id: 'users_count',
          text: t('table.users_count'),
          cell: ({ data }) => {
            if (data.guest) return null;

            return (
              <Link href={`/admin/members/users?groups=${data.id}`}>
                {data.users_count}
              </Link>
            );
          },
        },
        {
          id: 'updated',
          text: tCore('table.updated'),
          sortable: true,
          cell: ({ data }) => {
            return <DateFormat date={data.updated} />;
          },
        },
        {
          id: 'actions',
          cell: ({ data }) => {
            return <ActionsTableGroupsMembersAdmin {...data} />;
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
