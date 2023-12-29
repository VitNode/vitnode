import { useTranslations } from 'next-intl';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { InfinityIcon, ShieldAlert } from 'lucide-react';

import { DataTable } from '@/components/data-table/data-table';
import type { ShowAdminStaffModerators } from '@/graphql/hooks';
import { DateFormat } from '@/components/date-format/date-format';
import { HeaderSortingDataTable } from '@/components/data-table/header';
import { Badge } from '@/components/ui/badge';
import { LinkUser } from '@/components/user/link/link-user';
import { GroupFormat } from '@/components/groups/group-format';
import type { ModeratorsStaffAdminViewProps } from '../moderators-view';

export const ContentTableModeratorsStaffAdmin = ({ data }: ModeratorsStaffAdminViewProps) => {
  const t = useTranslations('admin.members.staff');

  const columns: ColumnDef<ShowAdminStaffModerators>[] = useMemo(
    () => [
      {
        header: t('table.moderator'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          if (data.user_or_group.__typename === 'User') {
            return <LinkUser user={data.user_or_group} />;
          }

          if (data.user_or_group.__typename === 'StaffGroupUser') {
            return (
              <GroupFormat
                group={{
                  ...data.user_or_group,
                  name: data.user_or_group.group_name
                }}
              />
            );
          }

          return null;
        }
      },
      {
        header: t('table.type'),
        accessorKey: 'type',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <Badge variant="outline">
              {t(data.user_or_group.__typename === 'User' ? 'user' : 'group')}
            </Badge>
          );
        }
      },
      {
        header: val => {
          return <HeaderSortingDataTable {...val}>{t('table.updated')}</HeaderSortingDataTable>;
        },
        accessorKey: 'updated',
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.updated} />;
        }
      },
      {
        header: t('table.permissions'),
        id: 'permissions',
        cell: ({ row }) => {
          const data = row.original;
          const unrestricted = data.unrestricted;

          return (
            <Badge className="[&>svg]:size-4" variant={unrestricted ? 'default' : 'secondary'}>
              {unrestricted ? <InfinityIcon /> : <ShieldAlert />}
              {t(unrestricted ? 'unrestricted' : 'restricted')}
            </Badge>
          );
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const data = row.original;

          if (data.protected) return null;

          return <div>actions</div>;
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={data?.core_staff_moderators__admin__show.edges ?? []}
      pageInfo={data?.core_staff_moderators__admin__show.pageInfo}
      defaultPageSize={10}
      columns={columns}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc'
      }}
    />
  );
};
