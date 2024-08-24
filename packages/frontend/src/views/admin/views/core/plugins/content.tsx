'use client';

import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { Admin__Core_Plugins__ShowQuery } from '@/graphql/queries/admin/plugins/admin__core_plugins__show.generated';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ActionsItemPluginsAdmin } from './table/actions/actions';

export const ContentPluginsCoreAdmin = ({
  admin__core_plugins__show: { edges, pageInfo },
}: Admin__Core_Plugins__ShowQuery) => {
  const t = useTranslations('admin.core.plugins');
  const tCore = useTranslations('core');

  return (
    <DataTable
      columns={[
        {
          id: 'name',
          title: tCore('table.name'),
          cell: ({ row }) => {
            return (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{row.name}</span>
                  {row.default && <Badge>{tCore('default')}</Badge>}
                </div>
                {row.description && (
                  <p className="text-muted-foreground max-w-80 truncate text-sm">
                    {row.description}
                  </p>
                )}
              </>
            );
          },
        },
        {
          id: 'version',
          title: tCore('table.version'),
          cell: ({ row }) => {
            if (!row.version_code) return null;

            return (
              <span className="flex gap-1">
                <span>{row.version}</span>
                <span className="text-muted-foreground">
                  ({row.version_code})
                </span>
              </span>
            );
          },
        },
        {
          id: 'author',
          title: tCore('table.author'),
          cell: ({ row }) => {
            if (row.author_url) {
              return (
                <a
                  className="flex gap-1"
                  href={row.author_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {row.author} <ExternalLink className="size-4" />
                </a>
              );
            }

            return <span className="flex gap-1">{row.author}</span>;
          },
        },
        {
          id: 'updated',
          title: tCore('table.updated'),
          sortable: true,
          cell: ({ row }) => {
            return <DateFormat date={row.updated} />;
          },
        },
        {
          id: 'actions',
          cell: ({ row }) => {
            return <ActionsItemPluginsAdmin {...row} />;
          },
        },
      ]}
      data={edges}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
      pageInfo={pageInfo}
      searchPlaceholder={t('search_placeholder')}
    />
  );
};
