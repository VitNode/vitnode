import { useTranslations } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { Link } from '@/i18n';
import { useGroupMembersAdminAPI } from './hooks/use-groups-members-admin-api';
import { Loader } from '@/components/loader/loader';
import { ShowAdminGroups } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/use-text-lang';
import { ActionsTableGroupsMembersAdmin } from './actions/actions-table-groups-members-admin';

export const ContentTableGroupsMembersAdmin = () => {
  const t = useTranslations('admin.members.groups');
  const { data, isFetching, isLoading, isPending } = useGroupMembersAdminAPI();
  const { convertText } = useTextLang();

  const columns: ColumnDef<ShowAdminGroups>[] = useMemo(
    () => [
      {
        header: t('table.name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center gap-4">
              <span>{convertText(data.name)}</span>
            </div>
          );
        }
      },
      {
        header: t('table.users_count'),
        accessorKey: 'usersCount',
        cell: ({ row }) => {
          const data = row.original;

          return data.id !== 1 ? (
            <Link href={`/admin/members/users?groups=${data.id}`}>{data.usersCount}</Link>
          ) : null;
        }
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsTableGroupsMembersAdmin data={data} />;
        }
      }
    ],
    []
  );

  if ((isLoading && !isFetching) || isPending) return <Loader />;

  return (
    <DataTable
      data={data?.show_admin_groups.edges ?? []}
      pageInfo={data?.show_admin_groups.pageInfo}
      defaultItemsPerPage={10}
      columns={columns}
      isFetching={isFetching}
    />
  );
};
