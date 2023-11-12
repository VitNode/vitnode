import { useTranslations } from 'next-intl';
import { Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/i18n';
import { useGroupsAdminAPI } from './hooks/use-groups-admin-api';
import { Loader } from '@/components/loader/loader';
import { ShowAdminGroups } from '@/graphql/hooks';

export const ContentTableGroupsUsersAdmin = () => {
  const t = useTranslations('admin');
  const { data, isFetching, isLoading } = useGroupsAdminAPI();

  const columns: ColumnDef<ShowAdminGroups>[] = useMemo(
    () => [
      {
        header: t('users.groups.table.name'),
        accessorKey: 'name'
      },
      {
        header: t('users.groups.table.users_count'),
        accessorKey: 'usersCount'
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/admin/users/groups/${data.id}`}
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'icon'
                      })}
                    >
                      <Pencil />
                      <span className="sr-only">{t('users.groups.actions.edit.title')}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{t('users.groups.actions.edit.title')}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        }
      }
    ],
    []
  );

  if (isLoading && !isFetching) return <Loader />;

  return (
    <DataTable
      data={data?.show_admin_groups.edges ?? []}
      pageInfo={data?.show_admin_groups.pageInfo}
      defaultItemsPerPage={10}
      isFetching={isFetching}
      columns={columns}
    />
  );
};
