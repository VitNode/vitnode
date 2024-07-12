'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Clock, File } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { formatBytes } from 'vitnode-shared';

import { ActionsFilesAdvancedCoreAdmin } from './actions/actions';
import { Admin__Core_Files__ShowQuery } from '@/graphql/graphql';
import { CONFIG } from '@/helpers/config-with-env';
import { HeaderSortingDataTable } from '@/components/data-table/header';
import { DateFormat } from '@/components/date-format';
import { Link } from '@/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DataTable } from '@/components/data-table/data-table';

export const ContentFilesAdvancedCoreAdminView = ({
  admin__core_files__show: { edges, pageInfo },
}: Admin__Core_Files__ShowQuery) => {
  const t = useTranslations('core.settings.files');
  const tCore = useTranslations('core');
  const columns: ColumnDef<
    Admin__Core_Files__ShowQuery['admin__core_files__show']['edges'][0]
  >[] = React.useMemo(
    () => [
      {
        header: '',
        accessorKey: 'id',
        cell: ({ row }) => {
          const data = row.original;
          const src =
            data?.width && data.height
              ? `${CONFIG.graphql_public_url}/${data.dir_folder}/${data.file_name}`
              : null;
          const alt = data?.file_alt ?? data?.file_name ?? '';

          return (
            <div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              {data.width && data.height && src ? (
                <Image
                  src={src}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  alt={alt}
                  fill
                />
              ) : (
                <File className="text-muted-foreground size-8" />
              )}
            </div>
          );
        },
      },
      {
        header: tCore('table.name'),
        accessorKey: 'file_name',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div>
              <span className="block max-w-80 truncate leading-tight">
                {data.file_name_original}
              </span>
              <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                <span>{data.mimetype}</span>
                {data?.width && data?.height && (
                  <>
                    <span>&middot;</span>
                    <span>
                      {data.width}x{data.height}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        },
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {tCore('table.created')}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: 'created',
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.created} />;
        },
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {t('table.file_size')}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: 'file_size',
        cell: ({ row }) => {
          const data = row.original;

          return formatBytes(data.file_size);
        },
      },
      {
        header: t('table.user'),
        accessorKey: 'user',
        cell: ({ row }) => {
          const data = row.original;

          return (
            <Link href={`/admin/members/users/${data.user.id}`}>
              {data.user.name}
            </Link>
          );
        },
      },
      {
        header: t('table.count_uses'),
        accessorKey: 'count_uses',
        cell: ({ row }) => {
          const data = row.original;

          if (data.count_uses === 0) {
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
                {data.count_uses}
              </div>
            );
          }

          return data.count_uses;
        },
      },
      {
        header: '',
        accessorKey: 'actions',
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsFilesAdvancedCoreAdmin {...data} />;
        },
      },
    ],
    [],
  );

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc',
      }}
      searchPlaceholder={t('search')}
      columns={columns}
    />
  );
};
