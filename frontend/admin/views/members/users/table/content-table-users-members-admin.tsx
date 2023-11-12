import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';

import {
  UsersMembersAdminAPIDataType,
  useUsersMembersAdminAPI
} from './hooks/use-users-members-admin-api';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from '@/i18n';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import { Loader } from '@/components/loader/loader';

export const ContentTableUsersMembersAdmin = () => {
  const t = useTranslations('admin.members.users');
  const { data, isFetching, isLoading } = useUsersMembersAdminAPI();

  const columns: ColumnDef<UsersMembersAdminAPIDataType>[] = useMemo(
    () => [
      {
        header: t('table.name'),
        accessorKey: 'name'
      },
      {
        header: t('table.groups'),
        accessorKey: 'groups'
      },
      {
        header: t('table.joined'),
        accessorKey: 'joined'
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
                      <span className="sr-only">{t('actions.edit.title')}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{t('actions.edit.title')}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        }
      }
    ],
    []
  );

  if (isLoading && isFetching) return <Loader />;

  return (
    <DataTable
      data={data?.show_admin_members.edges ?? []}
      pageInfo={data?.show_admin_members.pageInfo}
      defaultItemsPerPage={10}
      isFetching={isFetching}
      columns={columns}
    />
  );
};
