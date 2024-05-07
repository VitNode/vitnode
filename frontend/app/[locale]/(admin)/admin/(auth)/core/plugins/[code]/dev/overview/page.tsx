import { notFound } from "next/navigation";

import { CONFIG } from "@/config/config";
import { getPluginDataAdmin } from "../query-api";
import { OverviewDevPluginAdminView } from "@/admin/core/views/core/plugins/views/dev/overview";

interface Props {
  params: {
    code: string;
  };
}

export default async function Page({ params: { code } }: Props) {
  if (!CONFIG.node_development) notFound();

  const { data } = await getPluginDataAdmin({ code });
  if (!data || data.admin__core_plugins__show.edges.length === 0) notFound();

  return (
    <OverviewDevPluginAdminView
      data={data.admin__core_plugins__show.edges[0]}
    />
  );
}
