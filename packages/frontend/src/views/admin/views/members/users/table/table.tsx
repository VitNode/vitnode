'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Pencil } from 'lucide-react';

import { Admin__Core_Members__ShowQuery } from '@/graphql/graphql';
import { AvatarUser } from '@/components/ui/user/avatar';
import { DateFormat } from '@/components/date-format';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { GroupFormat } from '@/components/ui/user/group-format';

export const TableUsersMembersAdmin = ({
  admin__core_members__show: { edges, pageInfo },
}: Admin__Core_Members__ShowQuery) => {
  const t = useTranslations('admin.members.users');
  const tCore = useTranslations('core');

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      columns={[
        {
          id: 'name',
          title: tCore('table.name'),
          cell: ({ row }) => {
            return (
              <div className="flex flex-wrap items-center gap-2">
                <AvatarUser user={row} sizeInRem={2} />

                <span>{row.name}</span>
              </div>
            );
          },
        },
        {
          id: 'email',
          title: t('table.email'),
        },
        {
          id: 'group',
          title: t('table.group'),
          cell: ({ row }) => {
            return <GroupFormat group={row.group} />;
          },
        },
        {
          id: 'joined',
          title: t('table.joined'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.joined} />;
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/members/users/${row.id}`}
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'icon',
                        })}
                      >
                        <Pencil />
                        <span className="sr-only">{tCore('edit')}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{tCore('edit')}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            );
          },
        },
      ]}
      searchPlaceholder={t('search_placeholder')}
      // filters={<GroupsFiltersUsersMembersAdmin />}
      // advancedFilters={<AdvancedFiltersUsersMembersAdmin />}
      defaultSorting={{
        sortBy: 'joined',
        sortDirection: 'desc',
      }}
    />
  );
};
