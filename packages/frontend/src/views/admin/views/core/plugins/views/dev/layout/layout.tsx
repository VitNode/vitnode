import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { CONFIG } from '@/helpers/config-with-env';
import { redirect } from '@/navigation';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { ActionsDevPluginAdmin } from './actions/actions';
import { getPluginDataAdmin } from './query-api';
import { TabsDevPluginAdmin } from './tabs';

export interface DevPluginAdminLayoutProps {
  children: React.ReactNode;
  params: {
    code: string;
  };
}

export async function generateMetadataDevPluginAdminLayout({
  params: { code },
}: DevPluginAdminLayoutProps): Promise<Metadata> {
  const data = await getPluginDataAdmin({ code });
  if (data.admin__core_plugins__show.edges.length === 0) return {};

  const defaultTitle = data.admin__core_plugins__show.edges[0].name;

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
  if (!CONFIG.node_development) redirect('/admin');
  const [data, t] = await Promise.all([
    getPluginDataAdmin({ code }),
    getTranslations('core'),
  ]);

  if (data.admin__core_plugins__show.edges.length === 0) {
    redirect('/admin');
  }

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
                className="inline-flex gap-1"
                href={author_url}
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
        h1={
          <div className="flex flex-wrap items-center gap-2">
            <span>{name}</span>
            {isDefault && <Badge>{t('default')}</Badge>}
          </div>
        }
      >
        <ActionsDevPluginAdmin {...plugin} />
      </HeaderContent>

      <TabsDevPluginAdmin code={code} />

      <Card className="p-6">{children}</Card>
    </>
  );
};
