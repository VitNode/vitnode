import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { getPluginDataAdmin } from "./query-api";
import { DevPluginAdminLayout } from "@/admin/core/views/core/plugins/views/dev/layout/layout";

interface Props {
  children: ReactNode;
  params: {
    code: string;
  };
}

export default async function Layout({ children, params: { code } }: Props) {
  const { data } = await getPluginDataAdmin({ code });

  if (!data || data.admin__core_plugins__show.edges.length === 0) notFound();

  return <DevPluginAdminLayout {...data}>{children}</DevPluginAdminLayout>;
}
