import * as React from 'react';
import { ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { ActionsDevPluginAdmin } from './actions/actions';
import { getPluginDataAdmin } from './query-api';

import { HeaderContent } from '@/components/ui/header-content';
import { Badge } from '@/components/ui/badge';
import { DateFormat } from '@/components/date-format';
import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { CONFIG } from '@/helpers/config-with-env';
import { getGlobalData } from '@/graphql/get-global-data';

export interface DevPluginAdminLayoutProps {
  children: React.ReactNode;
  params: {
    code: string;
  };
}

export async function generateMetadataDevPluginAdminLayout({
  params: { code },
}: DevPluginAdminLayoutProps): Promise<Metadata> {
  const [t, tCore, config] = await Promise.all([
    getTranslations('admin'),
    getTranslations('core.admin'),
    getGlobalData(),
  ]);

  const data = await getPluginDataAdmin({ code });
  if (!data || data.admin__core_plugins__show.edges.length === 0) return {};

  const defaultTitle = `${data.admin__core_plugins__show.edges[0].name} - ${tCore('nav.plugins')} - ${t('title_short')} - ${config.core_settings__show.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle,
    },
  };
}

export const DevPluginAdminLayout = async ({
  params: { code },
  children,
}: DevPluginAdminLayoutProps) => {
  if (!CONFIG.node_development) notFound();
  const data = await getPluginDataAdmin({ code });

  if (!data || data.admin__core_plugins__show.edges.length === 0) notFound();

  const [t, tCore] = await Promise.all([
    getTranslations('admin.core.plugins.dev'),
    getTranslations('core'),
  ]);

  const plugin = data.admin__core_plugins__show.edges.at(0);
  if (!plugin) return null;

  const {
    author,
    author_url,
    default: isDefault,
    description,
    name,
    updated,
    version,
    version_code,
  } = plugin;

  return (
    <>
      <HeaderContent
        h1={
          <div className="flex flex-wrap items-center gap-2">
            <span>{name}</span>
            {isDefault && <Badge>{tCore('default')}</Badge>}
          </div>
        }
        desc={
          <div>
            {description && (
              <p className="max-w-80 truncate text-sm">{description}</p>
            )}
            {version && version_code && (
              <span className="flex flex-wrap gap-1">
                <span>{version}</span>
                <span>
                  ({version_code}), <DateFormat date={updated} />
                </span>
              </span>
            )}
            {author_url ? (
              <a
                href={author_url}
                className="inline-flex gap-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                {author} <ExternalLink className="size-4" />
              </a>
            ) : (
              <span className="flex gap-1">{author}</span>
            )}
          </div>
        }
      >
        <ActionsDevPluginAdmin {...plugin} />
      </HeaderContent>

      <Tabs className="mb-5">
        <TabsTrigger
          id="overview"
          href={`/admin/core/plugins/${code}/dev/overview`}
        >
          {t('overview.title')}
        </TabsTrigger>
        <TabsTrigger id="files" href={`/admin/core/plugins/${code}/dev/files`}>
          {t('files.title')}
        </TabsTrigger>
        <TabsTrigger id="nav" href={`/admin/core/plugins/${code}/dev/nav`}>
          {t('nav.title')}
        </TabsTrigger>
      </Tabs>

      <Card className="p-6">{children}</Card>
    </>
  );
};
