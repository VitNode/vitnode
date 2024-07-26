'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

import { ActionsItemPluginsAdmin } from './table/actions/actions';
import { Admin__Core_Plugins__ShowQuery } from '@/graphql/graphql';
import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';

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
          text: tCore('table.name'),
          cell: ({ data }) => {
            return (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{data.name}</span>
                  {data.default && <Badge>{tCore('default')}</Badge>}
                </div>
                {data.description && (
                  <p className="text-muted-foreground max-w-80 truncate text-sm">
                    {data.description}
                  </p>
                )}
              </>
            );
          },
        },
        {
          id: 'version',
          text: tCore('table.version'),
          cell: ({ data }) => {
            if (!data.version_code) return null;

            return (
              <span className="flex gap-1">
                <span>{data.version}</span>
                <span className="text-muted-foreground">
                  ({data.version_code})
                </span>
              </span>
            );
          },
        },
        {
          id: 'author',
          text: tCore('table.author'),
          cell: ({ data }) => {
            if (data.author_url) {
              return (
                <a
                  href={data.author_url}
                  className="flex gap-1"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {data.author} <ExternalLink className="size-4" />
                </a>
              );
            }

            return <span className="flex gap-1">{data.author}</span>;
          },
        },
        {
          id: 'updated',
          text: tCore('table.updated'),
          sortable: true,
          cell: ({ data }) => {
            return <DateFormat date={data.updated} />;
          },
        },
        {
          id: 'actions',
          cell: ({ data }) => {
            return <ActionsItemPluginsAdmin {...data} />;
          },
        },
      ]}
      data={edges}
      defaultSorting={{
        sortBy: 'updated',
        sortDirection: 'desc',
      }}
      searchPlaceholder={t('search_placeholder')}
      pageInfo={pageInfo}
      defaultPageSize={10}
    />
  );
};
