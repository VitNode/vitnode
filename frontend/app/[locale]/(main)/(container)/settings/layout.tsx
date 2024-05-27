import * as React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getSessionData } from "@/functions/get-session-data";
import { getConfigFile } from "@/config/helpers";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfigFile();
  const t = await getTranslations("core.settings");

  return {
    title: {
      default: t("title"),
      template: `%s - ${t("title")} - ${config.settings.general.site_name}`
    },
    robots: "noindex, nofollow"
  };
}

export default async function Layout({ children }: Props) {
  const { theme_id } = await getSessionData();
  const LayoutFromLazy: React.LazyExoticComponent<
    ({ children }: { children: React.ReactNode }) => JSX.Element
  > = React.lazy(async () =>
    import(
      `@/themes/${theme_id}/core/views/settings/layout-settings-view`
    ).catch(
      async () => import("@/themes/1/core/views/settings/layout-settings-view")
    )
  );

  return <LayoutFromLazy>{children}</LayoutFromLazy>;
}
