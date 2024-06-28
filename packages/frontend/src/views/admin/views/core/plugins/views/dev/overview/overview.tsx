import { notFound } from 'next/navigation';

import { getPluginDataAdmin } from '../layout/query-api';
import { ContentOverviewDevPluginAdmin } from './content';

export interface OverviewDevPluginAdminViewProps {
  params: { code: string };
}

export const OverviewDevPluginAdminView = async ({
  params: { code },
}: OverviewDevPluginAdminViewProps) => {
  const { data } = await getPluginDataAdmin({ code });
  if (!data || data.admin__core_plugins__show.edges.length === 0) notFound();

  return (
    <ContentOverviewDevPluginAdmin
      {...data.admin__core_plugins__show.edges[0]}
    />
  );
};
