import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

interface Props {
  children: ReactNode;
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
