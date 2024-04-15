import { lazy, type LazyExoticComponent, type ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getConfigFile } from "@/config/get-config-file";
import { getSessionData } from "@/functions/get-session-data";

interface Props {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const config = await getConfigFile();
  const t = await getTranslations({ locale, namespace: "core.settings" });

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
  const LayoutFromLazy: LazyExoticComponent<
    ({ children }: { children: ReactNode }) => JSX.Element
  > = lazy(() =>
    import(
      `@/themes/${theme_id}/core/views/settings/layout-settings-view`
    ).catch(() => import("@/themes/1/core/views/settings/layout-settings-view"))
  );

  return <LayoutFromLazy>{children}</LayoutFromLazy>;
}
