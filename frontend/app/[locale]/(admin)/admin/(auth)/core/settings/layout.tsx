import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";
import { getConfigFile } from "@/config/helpers";

interface Props {
  children: ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [t, tCore, config] = await Promise.all([
    getTranslations("admin"),
    getTranslations("core.admin"),
    getConfigFile()
  ]);

  const defaultTitle = `${tCore("nav.settings")} - ${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle
    }
  };
}

export default async function Layout({ children }: Props) {
  const t = await getTranslations("admin.core.settings");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="main" href="/admin/core/settings/main">
          {t("main.title")}
        </TabsTrigger>
        <TabsTrigger id="security" href="/admin/core/settings/security">
          {t("security.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
}
