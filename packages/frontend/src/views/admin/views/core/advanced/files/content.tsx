'use client';

import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Admin__Core_Files__ShowQuery } from '@/graphql/queries/admin/advanced/files/admin__core_files__show.generated';
import { CONFIG } from '@/helpers/config-with-env';
import { formatBytes } from '@/helpers/format-bytes';
import { Link } from '@/navigation';
import { Clock, File } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsFilesAdvancedCoreAdmin } from './actions/actions';

export const ContentFilesAdvancedCoreAdminView = ({
  admin__core_files__show: { edges, pageInfo },
}: Admin__Core_Files__ShowQuery) => {
  const t = useTranslations('core.settings.files');
  const tCore = useTranslations('core');

  return (
    <DataTable
      columns={[
        {
          id: 'id',
          cell: ({ row }) => {
            const src =
              row.width && row.height
                ? `${CONFIG.backend_public_url}/${row.dir_folder}/${row.file_name}`
                : null;
            const alt = row.file_alt ?? row.file_name;

            return (
              <div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                {row.width && row.height && src ? (
                  <Image
                    alt={alt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={src}
                  />
                ) : (
                  <File className="text-muted-foreground size-8" />
                )}
              </div>
            );
          },
        },
        {
          id: 'file_name',
          title: tCore('table.name'),
          cell: ({ row }) => {
            return (
              <div>
                <span className="block max-w-80 truncate leading-tight">
                  {row.file_name_original}
                </span>
                <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                  <span>{row.mimetype}</span>
                  {row.width && row.height && (
                    <>
                      <span>&middot;</span>
                      <span>
                        {row.width}x{row.height}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          },
        },
        {
          id: 'created',
          sortable: true,
          title: tCore('table.created'),
          cell: ({ row }) => {
            return <DateFormat date={row.created} />;
          },
        },
        {
          id: 'file_size',
          sortable: true,
          title: t('table.file_size'),
          cell: ({ row }) => {
            return formatBytes(row.file_size);
          },
        },
        {
          id: 'user',
          title: t('table.user'),
          cell: ({ row }) => {
            if (row.user?.id) {
              return (
                <Link href={`/admin/members/users/${row.user.id}`}>
                  {row.user.name}
                </Link>
              );
            }
          },
        },
        {
          id: 'count_uses',
          title: t('table.count_uses'),
          cell: ({ row }) => {
            if (row.count_uses === 0) {
              return (
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Clock className="text-destructive size-4" />
                      </TooltipTrigger>
                      <TooltipContent>{t('temp_file')}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {row.count_uses}
                </div>
              );
            }

            return row.count_uses;
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return <ActionsFilesAdvancedCoreAdmin {...row} />;
          },
        },
      ]}
      data={edges}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc',
      }}
      pageInfo={pageInfo}
      searchPlaceholder={t('search')}
    />
  );
};
