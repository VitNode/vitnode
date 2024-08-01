'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Clock, Download, File } from 'lucide-react';
import { formatBytes } from 'vitnode-shared';

import { CONFIG } from '@/helpers/config-with-env';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@/navigation';
import { buttonVariants } from '@/components/ui/button';
import { DateFormat } from '@/components/date-format';
import { DataTable } from '@/components/ui/data-table';
import { Core_Members__Files__ShowQuery } from '@/graphql/queries/settings/core_members__files__show.generated';

export const ContentFilesSettings = ({
  core_files__show: { edges, pageInfo },
}: Core_Members__Files__ShowQuery) => {
  const t = useTranslations('core.settings.files');
  const tCore = useTranslations('core');

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc',
      }}
      searchPlaceholder={t('search')}
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
          title: tCore('table.created'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.created} />;
          },
        },
        {
          id: 'file_size',
          title: t('table.file_size'),
          sortable: true,
          cell: ({ row }) => {
            return formatBytes(row.file_size);
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
            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={buttonVariants({
                        size: 'icon',
                        variant: 'ghost',
                      })}
                      href={
                        row.width && row.height
                          ? `${CONFIG.backend_public_url}/${row.dir_folder}/${row.file_name}`
                          : `${CONFIG.backend_url}/secure_files/${row.id}?security_key=${row.security_key}`
                      }
                      target="_blank"
                      aria-label={tCore('download')}
                    >
                      <Download />
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent>{tCore('download')}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          },
        },
      ]}
    />
  );
};
