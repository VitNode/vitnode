'use client';

import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { GroupFormat } from '@/components/ui/user/group-format';
import { UserLink } from '@/components/ui/user/link';
import { Admin__Core_Staff_Moderators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_moderators__show.generated';
import { InfinityIcon, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsTableModeratorsStaffAdmin } from './actions/actions';

export const TableModeratorsStaffAdmin = ({
  admin__core_staff_moderators__show: { edges, pageInfo },
}: Admin__Core_Staff_Moderators__ShowQuery) => {
  const t = useTranslations('admin.members.staff');

  return (
    <DataTable
      columns={[
        {
          id: 'name',
          title: t('table.moderator'),
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

            return <ActionsTableModeratorsStaffAdmin data={row} />;
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
