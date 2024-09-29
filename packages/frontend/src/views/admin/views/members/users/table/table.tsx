'use client';

import { DateFormat } from '@/components/date-format';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { AvatarUser } from '@/components/ui/user/avatar';
import { GroupFormat } from '@/components/ui/user/group-format';
import { Admin__Core_Members__ShowQuery } from '@/graphql/queries/admin/members/users/admin__core_members__show.generated';
import { Link } from '@/navigation';
import { Eye, MailWarning } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export const TableUsersMembersAdmin = ({
  admin__core_members__show: { edges, pageInfo },
}: Admin__Core_Members__ShowQuery) => {
  const t = useTranslations('admin.members.users');
  const tCore = useTranslations('core.global');

  return (
    <DataTable
      columns={[
        {
          id: 'name',
          title: t('name'),
          cell: ({ row }) => {
            return (
              <div className="flex flex-wrap items-center gap-2">
                <AvatarUser sizeInRem={2} user={row} />

                <span>{row.name}</span>
              </div>
            );
          },
        },
        {
          id: 'email',
          title: t('email'),
          cell: ({ row }) => {
            return (
              <div className="flex flex-wrap items-center gap-2">
                {!row.email_verified && (
                  <TooltipWrapper
                    content={t('item.info.not_email_verified')}
                    delayDuration={0}
                  >
                    <MailWarning className="text-destructive size-5" />
                  </TooltipWrapper>
                )}
                <span>{row.email}</span>
              </div>
            );
          },
        },
        {
          id: 'group',
          title: t('group'),
          cell: ({ row }) => {
            return <GroupFormat group={row.group} />;
          },
        },
        {
          id: 'joined',
          title: t('joined'),
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
                <Button
                  ariaLabel={tCore('edit')}
                  asChild
                  size="icon"
                  variant="ghost"
                >
                  <Link href={`/admin/members/users/${row.id}`}>
                    <Eye />
                  </Link>
                </Button>
              </>
            );
          },
        },
      ]}
      data={edges}
      // advancedFilters={<AdvancedFiltersUsersMembersAdmin />}
      defaultSorting={{
        sortBy: 'joined',
        sortDirection: 'desc',
      }}
      pageInfo={pageInfo}
      // filters={<GroupsFiltersUsersMembersAdmin />}
      searchPlaceholder={t('search_placeholder')}
    />
  );
};
