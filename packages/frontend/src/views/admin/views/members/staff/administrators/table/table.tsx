'use client';

import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { GroupFormat } from '@/components/ui/user/group-format';
import { UserLink } from '@/components/ui/user/link';
import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { InfinityIcon, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsTableAdministratorsStaffAdmin } from './actions/actions';

export const TableAdministratorsStaffAdmin = ({
  admin__core_staff_administrators__show: { edges, pageInfo },
}: Admin__Core_Staff_Administrators__ShowQuery) => {
  const t = useTranslations('admin.members.staff.administrators');
  const tShared = useTranslations('admin.members.staff.shared');

  return (
    <DataTable
      columns={[
        {
          id: 'name',
          title: t('administrator'),
          cell: ({ row }) => {
            if (row.user_or_group.__typename === 'User') {
              return <UserLink user={row.user_or_group} />;
            }

            return (
              <GroupFormat
                group={{
                  ...row.user_or_group,
                  name: row.user_or_group.group_name,
                }}
              />
            );
          },
        },
        {
          id: 'type',
          title: tShared('type'),
          cell: ({ row }) => {
            return (
              <Badge variant="outline">
                {tShared(
                  row.user_or_group.__typename === 'User' ? 'user' : 'group',
                )}
              </Badge>
            );
          },
        },
        {
          id: 'updated',
          title: tShared('updated'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.updated} />;
          },
        },
        {
          id: 'permissions',
          title: tShared('permissions'),
          cell: ({ row }) => {
            const unrestricted = row.unrestricted;

            return (
              <Badge
                className="[&>svg]:size-4"
                variant={unrestricted ? 'default' : 'secondary'}
              >
                {unrestricted ? <InfinityIcon /> : <ShieldAlert />}
                {tShared(unrestricted ? 'unrestricted.title' : 'restricted')}
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
      data={edges}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
      pageInfo={pageInfo}
    />
  );
};
