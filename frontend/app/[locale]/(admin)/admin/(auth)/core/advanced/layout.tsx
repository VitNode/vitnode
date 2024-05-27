import { getTranslations } from "next-intl/server";
import * as React from "react";
import { Metadata } from "next";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";
import { getConfigFile } from "@/config/helpers";

interface Props {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const [t, tCore, config] = await Promise.all([
    getTranslations("admin"),
    getTranslations("core.admin"),
    getConfigFile()
  ]);

  const defaultTitle = `${tCore("nav.advanced")} - ${t("title_short")} - ${config.settings.general.site_name}`;

  return {
    title: {
      template: `%s - ${defaultTitle}`,
      absolute: defaultTitle
    }
  };
}

export default async function Layout({ children }: Props) {
  const t = await getTranslations("admin.core.advanced");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="files" href="/admin/core/advanced/files">
          {t("files.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
}
