import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getPluginDataAdmin } from "./query-api";
import { DevPluginAdminLayout } from "@/admin/core/views/core/plugins/views/dev/layout/layout";
import { getConfigFile } from "@/config";

interface Props {
  children: ReactNode;
  params: {
    code: string;
  };
}

export async function generateMetadata({
  params: { code }
}: Props): Promise<Metadata> {
  const [t, tCore, config] = await Promise.all([
    getTranslations("admin"),
    getTranslations("core.admin"),
    getConfigFile()
  ]);

  const { data } = await getPluginDataAdmin({ code });
  if (!data || data.admin__core_plugins__show.edges.length === 0) return {};

  const defaultTitle = `${data.admin__core_plugins__show.edges[0].name} - ${tCore("nav.plugins")} - ${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle
    }
  };
}

export default async function Layout({ children, params: { code } }: Props) {
  const { data } = await getPluginDataAdmin({ code });

  if (!data || data.admin__core_plugins__show.edges.length === 0) notFound();

  return <DevPluginAdminLayout {...data}>{children}</DevPluginAdminLayout>;
}
