'use client';

import { Clock, File } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import { formatBytes } from 'vitnode-shared';

import { ActionsFilesAdvancedCoreAdmin } from './actions/actions';
import { Admin__Core_Files__ShowQuery } from '@/graphql/graphql';
import { CONFIG } from '@/helpers/config-with-env';
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

  return (
    <DataTable
      columns={[
        {
          id: 'id',
          cell: ({ data }) => {
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
          id: 'file_name',
          text: tCore('table.name'),
          cell: ({ data }) => {
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
          id: 'created',
          sortable: true,
          text: tCore('table.created'),
          cell: ({ data }) => {
            return <DateFormat date={data.created} />;
          },
        },
        {
          id: 'file_size',
          sortable: true,
          text: t('table.file_size'),
          cell: ({ data }) => {
            return formatBytes(data.file_size);
          },
        },
        {
          id: 'user',
          text: t('table.user'),
          cell: ({ data }) => {
            return (
              <Link href={`/admin/members/users/${data.user.id}`}>
                {data.user.name}
              </Link>
            );
          },
        },
        {
          id: 'count_uses',
          text: t('table.count_uses'),
          cell: ({ data }) => {
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
          id: 'actions',
          cell: ({ data }) => {
            return <ActionsFilesAdvancedCoreAdmin {...data} />;
          },
        },
      ]}
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      defaultSorting={{
        sortBy: 'created',
        sortDirection: 'desc',
      }}
      searchPlaceholder={t('search')}
    />
  );
};
