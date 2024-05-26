import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";
import { Metadata } from "next";

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

  const defaultTitle = `${tCore("nav.metadata")} - ${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle
    }
  };
}

export default async function Layout({ children }: Props) {
  const t = await getTranslations("admin.core.metadata");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="manifest" href="/admin/core/metadata/manifest">
          {t("manifest.title")}
        </TabsTrigger>
        <TabsTrigger id="sitemap" href="/admin/core/metadata/sitemap">
          {t("sitemap.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
}
