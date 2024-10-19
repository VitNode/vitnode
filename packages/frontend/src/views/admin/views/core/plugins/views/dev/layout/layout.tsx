import { DateFormat } from '@/components/date-format';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import {
  checkAdminPermissionPage,
  checkAdminPermissionPageMetadata,
} from '@/graphql/get-session-admin-data';
import { CONFIG } from '@/helpers/config-with-env';
import { redirect } from '@/navigation';
import { ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { ActionsDevPluginAdmin } from './actions/actions';
import { getPluginDataAdmin } from './query-api';
import { TabsDevPluginAdmin } from './tabs';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    code: string;
    locale: string;
  }>;
}

const permission = {
  plugin_code: 'core',
  group: 'can_manage_plugins',
  permission: '',
};

export async function generateMetadataDevPluginAdminLayout({
  params,
}: Props): Promise<Metadata> {
  const perm = await checkAdminPermissionPageMetadata(permission);
  if (perm) return perm;
  const { code } = await params;
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

export const DevPluginAdminLayout = async ({ params, children }: Props) => {
  const perm = await checkAdminPermissionPage(permission);
  if (perm) return perm;
  const { code, locale } = await params;
  if (!CONFIG.node_development) redirect({ href: '/admin', locale });
  const [data, t] = await Promise.all([
    getPluginDataAdmin({ code }),
    getTranslations('core.global'),
  ]);

  if (data.admin__core_plugins__show.edges.length === 0) {
    redirect({ href: '/admin', locale });
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
