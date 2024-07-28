'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { InfinityIcon, ShieldAlert } from 'lucide-react';

import { ActionsTableAdministratorsStaffAdmin } from './actions/actions';
import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/graphql';
import { UserLink } from '@/components/ui/user/link';
import { GroupFormat } from '@/components/ui/user/group-format';
import { Badge } from '@/components/ui/badge';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';

export const TableAdministratorsStaffAdmin = ({
  admin__core_staff_administrators__show: { edges, pageInfo },
}: Admin__Core_Staff_Administrators__ShowQuery) => {
  const t = useTranslations('admin.members.staff');

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      columns={[
        {
          id: 'name',
          title: t('table.administrator'),
          cell: ({ row }) => {
            if (row.user_or_group.__typename === 'User') {
              return <UserLink user={row.user_or_group} />;
            }

            if (row.user_or_group.__typename === 'StaffGroupUser') {
              return (
                <GroupFormat
                  group={{
                    ...row.user_or_group,
                    name: row.user_or_group.group_name,
                  }}
                />
              );
            }

            return null;
          },
        },
        {
          id: 'type',
          title: t('table.type'),
          cell: ({ row }) => {
            return (
              <Badge variant="outline">
                {t(row.user_or_group.__typename === 'User' ? 'user' : 'group')}
              </Badge>
            );
          },
        },
        {
          id: 'updated',
          title: t('table.updated'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.updated} />;
          },
        },
        {
          id: 'permissions',
          title: t('table.permissions'),
          cell: ({ row }) => {
            const unrestricted = row.unrestricted;

            return (
              <Badge
                className="[&>svg]:size-4"
                variant={unrestricted ? 'default' : 'secondary'}
              >
                {unrestricted ? <InfinityIcon /> : <ShieldAlert />}
                {t(unrestricted ? 'unrestricted' : 'restricted')}
              </Badge>
            );
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            if (row.protected) return null;

            return <ActionsTableAdministratorsStaffAdmin data={row} />;
          },
        },
      ]}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
    />
  );
};
