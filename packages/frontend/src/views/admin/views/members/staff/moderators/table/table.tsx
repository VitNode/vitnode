'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { InfinityIcon, ShieldAlert } from 'lucide-react';

import { ActionsTableModeratorsStaffAdmin } from './actions/actions';
import { Admin__Core_Staff_Moderators__ShowQuery } from '@/graphql/graphql';
import { UserLink } from '@/components/ui/user/link';
import { GroupFormat } from '@/components/ui/user/group-format';
import { Badge } from '@/components/ui/badge';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';

export const TableModeratorsStaffAdmin = ({
  admin__core_staff_moderators__show: { edges, pageInfo },
}: Admin__Core_Staff_Moderators__ShowQuery) => {
  const t = useTranslations('admin.members.staff');

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      columns={[
        {
          id: 'name',
          text: t('table.moderator'),
          cell: ({ data }) => {
            if (data.user_or_group.__typename === 'User') {
              return <UserLink user={data.user_or_group} />;
            }

            if (data.user_or_group.__typename === 'StaffGroupUser') {
              return (
                <GroupFormat
                  group={{
                    ...data.user_or_group,
                    name: data.user_or_group.group_name,
                  }}
                />
              );
            }

            return null;
          },
        },
        {
          id: 'type',
          text: t('table.type'),
          cell: ({ data }) => {
            return (
              <Badge variant="outline">
                {t(data.user_or_group.__typename === 'User' ? 'user' : 'group')}
              </Badge>
            );
          },
        },
        {
          id: 'updated',
          text: t('table.updated'),
          sortable: true,
          cell: ({ data }) => {
            return <DateFormat date={data.updated} />;
          },
        },
        {
          id: 'permissions',
          text: t('table.permissions'),
          cell: ({ data }) => {
            const unrestricted = data.unrestricted;

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
          cell: ({ data }) => {
            if (data.protected) return null;

            return <ActionsTableModeratorsStaffAdmin data={data} />;
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
