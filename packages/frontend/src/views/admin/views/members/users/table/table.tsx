'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Pencil } from 'lucide-react';

import { Admin__Core_Members__ShowQuery } from '@/graphql/graphql';
import { useTextLang } from '@/hooks/use-text-lang';
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
import { DataTable } from '@/components/data-table/data-table';

export const TableUsersMembersAdmin = ({
  admin__core_members__show: { edges, pageInfo },
}: Admin__Core_Members__ShowQuery) => {
  const t = useTranslations('admin.members.users');
  const tCore = useTranslations('core');
  const { convertText } = useTextLang();

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      columns={[
        {
          id: 'name',
          text: tCore('table.name'),
          cell: ({ data }) => {
            return (
              <div className="flex flex-wrap items-center gap-2">
                <AvatarUser user={data} sizeInRem={2} />

                <span>{data.name}</span>
              </div>
            );
          },
        },
        {
          id: 'email',
          text: t('table.email'),
        },
        {
          id: 'group',
          text: t('table.group'),
          cell: ({ data }) => {
            return convertText(data.group.name);
          },
        },
        {
          id: 'joined',
          text: t('table.joined'),
          sortable: true,
          cell: ({ data }) => {
            return <DateFormat date={data.joined} />;
          },
        },
        {
          id: 'actions',
          cell: ({ data }) => {
            return (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/admin/members/users/${data.id}`}
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
