import { notFound } from 'next/navigation';

import { FormCreateEditPluginAdmin } from '../../actions/create/form';
import { getPluginDataAdmin } from './layout/query-api';

export interface OverviewDevPluginAdminViewProps {
  params: { code: string };
}

export const OverviewDevPluginAdminView = async ({
  params: { code },
}: OverviewDevPluginAdminViewProps) => {
  const data = await getPluginDataAdmin({ code });
  if (data.admin__core_plugins__show.edges.length === 0) notFound();

  return (
    <FormCreateEditPluginAdmin
      className="max-w-xl"
      data={data.admin__core_plugins__show.edges[0]}
    />
  );
};
