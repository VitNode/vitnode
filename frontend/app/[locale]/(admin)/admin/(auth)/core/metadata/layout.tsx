import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const t = await getTranslations("admin.core.metadata");

  return (
    <>
      <Tabs className="mb-5">
        <TabsTrigger id="manifest" href="/admin/core/metadata/manifest">
          {t("manifest.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </>
  );
}
