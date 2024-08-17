'use client';

import { Clock, File } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { ActionsFilesAdvancedCoreAdmin } from './actions/actions';
import { CONFIG } from '@/helpers/config-with-env';
import { DateFormat } from '@/components/date-format';
import { Link } from '@/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DataTable } from '@/components/ui/data-table';
import { Admin__Core_Files__ShowQuery } from '@/graphql/queries/admin/advanced/files/admin__core_files__show.generated';
import { formatBytes } from '@/helpers/format-bytes';
import { Calendar } from '@/components/ui/calendar';

export const ContentFilesAdvancedCoreAdminView = ({
  admin__core_files__show: { edges, pageInfo },
}: Admin__Core_Files__ShowQuery) => {
  const t = useTranslations('core.settings.files');
  const tCore = useTranslations('core');
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />

      <DataTable
        columns={[
          {
            id: 'id',
            cell: ({ row }) => {
              const src =
                row?.width && row.height
                  ? `${CONFIG.graphql_public_url}/${row.dir_folder}/${row.file_name}`
                  : null;
              const alt = row?.file_alt ?? row?.file_name ?? '';

              return (
                <div className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                  {row.width && row.height && src ? (
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
                    {row?.width && row?.height && (
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
              return (
                <Link href={`/admin/members/users/${row.user.id}`}>
                  {row.user.name}
                </Link>
              );
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
        pageInfo={pageInfo}
        defaultSorting={{
          sortBy: 'created',
          sortDirection: 'desc',
        }}
        searchPlaceholder={t('search')}
      />
    </>
  );
};
