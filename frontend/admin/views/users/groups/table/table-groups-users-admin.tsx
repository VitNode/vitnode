'use client';

import { useTranslations } from 'next-intl';
import { Pencil } from 'lucide-react';

import { DataTable } from '@/components/data-table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/i18n';
import { useGroupsAdminAPI } from './hooks/use-groups-admin-api';
import { Loader } from '@/components/loader/loader';

export const TableGroupsUsersAdmin = () => {
  const t = useTranslations('admin');
  const { isLoading } = useGroupsAdminAPI();

  if (isLoading) return <Loader />;

  return (
    <DataTable
      pageInfo={{
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: '',
        startCursor: '',
        count: 0,
        totalCount: 0
      }}
      columns={[
        {
          header: t('users.groups.table.name'),
          accessorKey: 'name'
        },
        {
          header: t('users.groups.table.users'),
          accessorKey: 'users'
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            const data = row.original;

            return (
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/users/groups/${data.id}`}
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'icon',
                          className: 'w-8 h-8 [&>svg]:w-4 [&>svg]:h-4'
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
      ]}
      data={[
        {
          id: '1',
          name: 'Admin',
          users: 1
        },
        {
          id: '2',
          name: 'User',
          users: 1
        }
      ]}
    />
  );
};
